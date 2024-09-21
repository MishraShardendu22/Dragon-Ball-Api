"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddingToDataSet_1 = __importDefault(require("./AddingToDataSet/AddingToDataSet"));
const dbConnect_1 = __importDefault(require("./dbConnect/dbConnect"));
const pattern_model_1 = __importDefault(require("./Model/pattern.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Port = process.env.PORT || 4000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Get a token for admin actions
app.post('/GetTokenAdmin', (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const token = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token });
    }
    else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});
// Token verification middleware
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};
// Get a random question
app.get("/random", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const randomData = yield pattern_model_1.default.aggregate([{ $sample: { size: 1 } }]);
        res.status(200).json(randomData[0]);
    }
    catch (error) {
        console.log('Failed to find a random question', error);
        res.status(500).json({ message: 'Failed to find a random question' });
    }
}));
// Get a question by ID
app.get("/question/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const data = yield pattern_model_1.default.findOne({ _id: id }); // Assuming you use an integer-based _id
        if (!data) {
            return res.status(404).json({ message: `No question with such ID. The given ID is ${id > 0 ? "too big" : "too small"}` });
        }
        res.status(200).json(data);
    }
    catch (error) {
        console.log('Failed to find a question by ID', error);
        res.status(500).json({ message: 'Failed to find a question by ID' });
    }
}));
// Get a question by series
app.get("/series/:series", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const seriesName = req.params.series;
        const data = yield pattern_model_1.default.find({ series: seriesName }).limit(5);
        if (!data) {
            return res.status(404).json({ message: 'No such series exists' });
        }
        res.status(200).json(data);
    }
    catch (error) {
        console.log('Failed to find a question by series', error);
        res.status(500).json({ message: 'Failed to find a question by series' });
    }
}));
// Add a new question
app.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const maxIdDoc = yield pattern_model_1.default.findOne().sort({ _id: -1 });
        const maxId = maxIdDoc ? maxIdDoc._id + 1 : 1;
        const newData = new pattern_model_1.default({
            _id: maxId,
            series: data.series,
            question: data.question,
            answer: data.answer
        });
        yield newData.save();
        res.status(201).json({ message: 'Question added successfully', newData });
    }
    catch (error) {
        console.log('Failed to add a question', error);
        res.status(500).json({ message: 'Failed to add a question' });
    }
}));
// Update a question by ID (full update)
app.put("/question/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedData = yield pattern_model_1.default.findByIdAndUpdate(id, {
            series: data.series,
            question: data.question,
            answer: data.answer
        }, { new: true });
        if (!updatedData) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json({ message: 'Question updated successfully', updatedData });
    }
    catch (error) {
        console.log('Failed to update the question', error);
        res.status(500).json({ message: 'Failed to update the question' });
    }
}));
// Update a question by ID (partial update)
app.patch("/question/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { series, question, answer } = req.body;
        const updatedQuestion = yield pattern_model_1.default.findByIdAndUpdate(id, { series, question, answer }, { new: true, runValidators: true });
        if (!updatedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json({ message: 'Question updated successfully', updatedQuestion });
    }
    catch (error) {
        console.log('Failed to update the question', error);
        res.status(500).json({ message: 'Failed to update the question' });
    }
}));
// Delete a question by ID
app.delete("/question/:id", verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deleted = yield pattern_model_1.default.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: 'No such question exists' });
        }
        res.status(200).json({ message: 'Question deleted successfully' });
    }
    catch (error) {
        console.log('Failed to delete the question', error);
        res.status(500).json({ message: 'Failed to delete the question' });
    }
}));
// Delete all questions (reset)
app.delete("/delete", verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield pattern_model_1.default.deleteMany({});
        res.status(200).json({ message: 'Data reset to default state', deletedCount: result.deletedCount });
    }
    catch (error) {
        console.log('Failed to reset data', error);
        res.status(500).json({ message: 'Failed to reset data' });
    }
}));
app.get('/', (req, res) => {
    res.send("Hi Bro");
});
// Server setup
app.listen(Port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, dbConnect_1.default)();
        yield (0, AddingToDataSet_1.default)();
    }
    catch (error) {
        console.log('Failed to connect to the database', error);
    }
    console.log(`Server is running at http://localhost:${Port}`);
}));
