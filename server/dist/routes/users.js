"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController = require('../controller/usersController');
const mylistsController = require('../controller/mylistsController');
const favoritesController = require('../controller/favoritesController');
const app = (0, express_1.default)();
app.get('/', usersController.getUsers);
// app.get('/',verifyJWT, usersController.getUsers);
//user lists
app.get('/:userId/lists', mylistsController.getAllListsFromUser);
app.post('/:userId/lists', mylistsController.createList);
//app.put('/:userId/lists/:id', mylistsController.updateList);
app.delete('/:userId/lists/:id', mylistsController.deleteList);
//user favorites
app.get('/:userId/favorites', favoritesController.getAllFavoritesFromUser);
module.exports = app;
