"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginController = require('../controller/loginController');
const app = (0, express_1.default)();
app.post('/', loginController.handleLogin);
module.exports = app;
