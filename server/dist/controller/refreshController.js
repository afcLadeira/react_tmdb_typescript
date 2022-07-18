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
//mongo
const User = require('../models/users');
const Favorite = require("../models/favorites");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const handleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;
    //MONGO
    let foundUser = yield User.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) {
        return res.sendStatus(403); //forbidden
    }
    //evaluate jwt
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err || foundUser.userName !== decoded.userName) {
            return res.sendStatus(403);
        }
        const accessToken = jwt.sign({ "userName": decoded.userName }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        let userFavorites;
        try {
            userFavorites = yield Favorite.findOne({ userId: foundUser.id }).exec();
        }
        catch (error) {
            userFavorites = [];
        }
        res.json({ user: { id: foundUser.id, userName: foundUser.userName, accessToken }, favorites: userFavorites ? userFavorites : { userId: foundUser.id, favoriteMovies: [] } });
    }));
});
module.exports = { handleRefreshToken };
