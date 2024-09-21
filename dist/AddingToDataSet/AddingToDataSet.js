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
const DB_data_set_json_1 = __importDefault(require("../DB_data_set.json"));
const pattern_model_1 = __importDefault(require("../Model/pattern.model"));
const AddInitialData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingData = yield pattern_model_1.default.find();
        if (existingData.length === 0) {
            yield pattern_model_1.default.insertMany(DB_data_set_json_1.default);
            console.log('Initial data added to the database');
        }
        else {
            console.log('Initial data already exists in the database, skipping insertion');
        }
    }
    catch (error) {
        console.error('Error adding data to the database:', error);
        throw error;
    }
});
exports.default = AddInitialData;
