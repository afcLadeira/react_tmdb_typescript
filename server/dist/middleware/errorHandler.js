"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHelper_1 = require("../helpers/errorHelper");
const errorHandler = (err, req, res, next) => {
    let stack;
    if (err instanceof err)
        stack = err.stack;
    else
        stack = String(err);
    console.log(stack);
    console.log(err.stack);
    return res.sendStatus(500).json({ message: (0, errorHelper_1.getErrorMessage)(err) });
};
module.exports = { errorHandler };
