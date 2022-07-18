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
Object.defineProperty(exports, "__esModule", { value: true });
const errorHelper_1 = require("../helpers/errorHelper");
const List = require("../models/lists");
const getAllListsFromUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const userLists = yield List.find({ userId: userId }).exec();
        res.status(200).json(userLists);
    }
    catch (error) {
        return res.sendStatus(500).json({ message: (0, errorHelper_1.getErrorMessage)(error) });
    }
});
const createList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const list = req.body;
    list.movies = [];
    try {
        // const result = await List.create({
        //     name: "test",
        //     description: "teste description",
        //     userId : 25,
        //     movies: []
        // });
        const result = yield List.create(list);
        res.status(201).json(result);
    }
    catch (error) {
        return res.sendStatus(500).json({ message: (0, errorHelper_1.getErrorMessage)(error) });
    }
});
const updateList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, id } = req.params;
    const updatedList = req.body;
    let list = yield List.findOne({ _id: id }).exec();
    if (!list) {
        return res
            .status(204)
            .json({ message: `No list matches ID ${req.body.id}.` });
    }
    list.name = updatedList.name;
    list.description = updatedList.description;
    list.movies = updatedList.movies;
    const result = yield list.save();
    res.json(result);
});
const updateListMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const movie = req.body;
    let list = yield List.findOne({ _id: id }).exec();
    if (!list) {
        return res.status(204).json({ message: `No list matches ID ${id}.` });
    }
    list.movies = [...list.movies, movie];
    const result = yield list.save();
    res.json(result);
});
const deleteList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id)
        return res.status(400).json({ message: "List ID required." });
    const listFromDB = yield List.findOne({ _id: id }).exec();
    if (!listFromDB) {
        return res.status(204).json({ message: `No list matches ID ${id}.` });
    }
    const result = yield listFromDB.deleteOne();
    res.json(result);
});
module.exports = {
    getAllListsFromUser,
    createList,
    updateList,
    deleteList,
    updateListMovies,
};
