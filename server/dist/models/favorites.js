"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const favoritesSchema = new Schema({
    userId: {
        type: Number,
        required: true
    },
    favoriteMovies: {
        type: Array
    },
});
module.exports = mongoose_1.default.model('favorites', favoritesSchema);
