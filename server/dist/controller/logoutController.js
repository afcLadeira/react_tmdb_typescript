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
//mongo
const User = require("../models/users");
const handleLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //todo: ON CLIENT ALSO DELETE accessToken if needed
    const cookies = req.cookies;
    if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
        return res.sendStatus(204); //no content
    }
    const refreshToken = cookies.jwt;
    //MONGO
    let foundUser = yield User.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
        return res.sendStatus(204); //no content
    }
    //delete refreshToken in db
    try {
        // with mongo db
        foundUser.refreshToken = "";
        const result = yield foundUser.save();
        //------------------------------
        res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
        return res.sendStatus(200);
    }
    catch (error) {
        return res.sendStatus(500).json({ message: (0, errorHelper_1.getErrorMessage)(error) });
    }
});
module.exports = { handleLogout };
