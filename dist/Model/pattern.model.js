"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dataSchema = new mongoose_1.default.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    series: {
        type: String,
        required: true
    },
    _id: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});
const Data = mongoose_1.default.model('Data', dataSchema);
exports.default = Data;
