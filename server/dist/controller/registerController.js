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
//const bcrypt = require("bcrypt");
const bcrypt = require('bcryptjs');
const handleNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res
            .status(400)
            .json({ message: "Username and password are required." });
    }
    //MONGO
    let duplicate = yield User.findOne({ userName: userName }).exec();
    if (duplicate)
        return res.status(409).json({ message: "Username already exists." });
    try {
        //encrypt the password
        //const hashedPwd = await bcrypt.hash(password, 10);
        //bcryptjs
        const hashedPwd = bcrypt.hashSync(password, 10);
        //store the new user
        //MONGO
        let usersCount = yield User.countDocuments({});
        const newUserMongo = {
            id: usersCount === 0 ? 1 : usersCount + 1,
            email: userName + "@fakeemail.com",
            userName: userName,
            password: hashedPwd,
        };
        const result = yield User.create(newUserMongo);
        console.log("🚀 ~ file: registerController.js ~ line 81 ~ handleNewUser ~ result", result);
        //------------------------------------
        res.status(201).json({ success: `New user ${userName} created` });
    }
    catch (error) {
        return res.sendStatus(500).json({ message: (0, errorHelper_1.getErrorMessage)(error) });
    }
});
module.exports = { handleNewUser };
