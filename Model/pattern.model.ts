import mongoose, { Document, Schema } from "mongoose";

interface IData extends Document {
    question: string;
    answer: string;
    series: string;
    _id: number; // Optional, if you want to use a numeric id
}

const dataSchema: Schema = new mongoose.Schema(
    {
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
    },
    { 
        timestamps: true 
    }
);

const Data = mongoose.model<IData>('Data', dataSchema);
export default Data;
