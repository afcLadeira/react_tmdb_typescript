"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
        return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    let mysecret = process.env.ACCESS_TOKEN_SECRET;
    // jwt.verify(token,mysecret, (err : VerifyErrors, decoded : JwtPayload  ) => {
    jsonwebtoken_1.default.verify(token, mysecret, (err, decoded) => {
        if (err)
            return res.sendStatus(403); //invalid token
        req.user = decoded.userName;
        next();
    });
};
module.exports = { verifyJWT };
