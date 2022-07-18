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
const Favorite = require("../models/favorites");
const getAllFavoritesFromUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const userFavorites = yield Favorite.findOne({ userId: userId }).exec();
        res
            .status(200)
            .json(userFavorites
            ? userFavorites
            : { userId: Number(userId), favoriteMovies: [] });
    }
    catch (error) {
        return res.sendStatus(500).json({ message: (0, errorHelper_1.getErrorMessage)(error) });
    }
});
const addFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = req.body;
    const { id: userId } = req.params;
    let favorite = yield Favorite.findOne({ userId: userId }).exec();
    if (!favorite) {
        //create
        const create = yield Favorite.create({
            userId: userId,
            favoriteMovies: [movie],
        });
        return res.status(204).json({ message: `No favorites matches ID.` });
    }
    favorite.favoriteMovies = [...favorite.favoriteMovies, movie];
    const result = yield favorite.save();
    res.json(result);
});
const deleteFavorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, movieId } = req.params;
    let favorite = yield Favorite.findOne({ userId: userId }).exec();
    if (!favorite) {
        return res.status(204).json({ message: `No favorites matches ID.` });
    }
    favorite.favoriteMovies = [
        ...favorite.favoriteMovies.filter((mov) => mov.id != movieId),
    ];
    const result = yield favorite.save();
    res.json(result);
});
module.exports = { getAllFavoritesFromUser, addFavorite, deleteFavorite };
