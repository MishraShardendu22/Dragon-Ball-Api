import AddInitialData from './AddingToDataSet/AddingToDataSet';
import dbConnect from './dbConnect/dbConnect';
import Data from './Model/pattern.model';
import jwt from 'jsonwebtoken';
import express, { Response, Request, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

// Use CORS middleware
app.use(cors());

app.use(cors({
  origin: 'http://localhost:5173'  // Replace with your frontend URL
}));


dotenv.config();

// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

const Port = process.env.PORT || 4000;
const app = express();

// Serve static files from the public directory
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req: Request, res: Response) => {
    res.send("Welcome to the Dragon Ball API => Here is the Link to the Docs : https://shardendu-mishra-documentation-dragon-ball-api.vercel.app/ ");
});

// Get a token for admin actions
app.post('/GetTokenAdmin', (req, res) => {
  const { username, password } = req.body;

  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Token verification middleware
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Get a random question
app.get("/random", async (req, res) => {
  try {
    const randomData = await Data.aggregate([{ $sample: { size: 1 } }]);
    res.status(200).json(randomData[0]);
  } catch (error) {
    console.log('Failed to find a random question', error);
    res.status(500).json({ message: 'Failed to find a random question' });
  }
});

// Get a question by ID
app.get("/question/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await Data.findOne({ _id: id });

    if (!data) {
      return res.status(404).json({ message: `No question with such ID. The given ID is ${id > 0 ? "too big" : "too small"}` });
    }

    res.status(200).json(data);
  } catch (error) {
    console.log('Failed to find a question by ID', error);
    res.status(500).json({ message: 'Failed to find a question by ID' });
  }
});

// Get a question by series
app.get("/series/:series", async (req, res) => {
  try {
    const seriesName = req.params.series;
    const data = await Data.find({ series: seriesName }).limit(5);

    if (!data) {
      return res.status(404).json({ message: 'No such series exists' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.log('Failed to find a question by series', error);
    res.status(500).json({ message: 'Failed to find a question by series' });
  }
});

// Add a new question
app.post('/add', async (req, res) => {
  try {
    const data = req.body;
    const maxIdDoc = await Data.findOne().sort({ _id: -1 });
    const maxId = maxIdDoc ? maxIdDoc._id + 1 : 1;

    const newData = new Data({
      _id: maxId,
      series: data.series,
      question: data.question,
      answer: data.answer
    });

    await newData.save();
    res.status(201).json({ message: 'Question added successfully', newData });
  } catch (error) {
    console.log('Failed to add a question', error);
    res.status(500).json({ message: 'Failed to add a question' });
  }
});

// Update a question by ID (full update)
app.put("/question/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updatedData = await Data.findByIdAndUpdate(id, {
      series: data.series,
      question: data.question,
      answer: data.answer
    }, { new: true });

    if (!updatedData) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question updated successfully', updatedData });
  } catch (error) {
    console.log('Failed to update the question', error);
    res.status(500).json({ message: 'Failed to update the question' });
  }
});

// Update a question by ID (partial update)
app.patch("/question/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { series, question, answer } = req.body;

    const updatedQuestion = await Data.findByIdAndUpdate(
      id,
      { series, question, answer },
      { new: true, runValidators: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json({ message: 'Question updated successfully', updatedQuestion });
  } catch (error) {
    console.log('Failed to update the question', error);
    res.status(500).json({ message: 'Failed to update the question' });
  }
});

// Delete a question by ID
app.delete("/question/:id", verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Data.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'No such question exists' });
    }

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.log('Failed to delete the question', error);
    res.status(500).json({ message: 'Failed to delete the question' });
  }
});

// Delete all questions (reset)
app.delete("/delete", verifyToken, async (req, res) => {
  try {
    const result = await Data.deleteMany({});
    res.status(200).json({ message: 'Data reset to default state', deletedCount: result.deletedCount });
  } catch (error) {
    console.log('Failed to reset data', error);
    res.status(500).json({ message: 'Failed to reset data' });
  }
});

// Server setup
app.listen(Port, async () => {
  try {
    await dbConnect();
    await AddInitialData();
  } catch (error) {
    console.log('Failed to connect to the database', error);
  }
  console.log(`Server is running at http://localhost:${Port}`);
});
