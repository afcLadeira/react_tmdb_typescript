"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mylistsController = require('../controller/mylistsController');
const app = (0, express_1.default)();
app.put('/:id', mylistsController.updateListMovies);
module.exports = app;
