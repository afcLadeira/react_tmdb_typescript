"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const registerController = require('../controller/registerController');
const app = (0, express_1.default)();
app.post('/', registerController.handleNewUser);
module.exports = app;
