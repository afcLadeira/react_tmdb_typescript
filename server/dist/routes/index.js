"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const { verifyJWT } = require('../middleware/verifyJWT');
let register = require('./register');
app.use('/register', register);
let login = require('./login');
app.use('/login', login);
let refresh = require('./refresh');
app.use('/refresh', refresh);
let logout = require('./logout');
app.use('/logout', logout);
let tmdb = require('./tmdb');
app.use('/tmdb', tmdb);
//Protected routes
app.use(verifyJWT);
let users = require('./users');
app.use('/users', users);
let favorites = require('./favorites');
app.use('/favorites', favorites);
let lists = require('./lists');
app.use('/lists', lists);
module.exports = app;
