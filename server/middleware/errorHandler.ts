import { Errback, NextFunction, Request, Response } from "express";
import { getErrorMessage } from "../helpers/errorHelper";

const errorHandler = (err : any, req : Request, res : Response, next : NextFunction) => {
  
  let stack

  if (err instanceof err) stack = err.stack
  else stack = String(err)

  console.log(stack)
  
  console.log(err.stack);
  return res.sendStatus(500).json({ message: getErrorMessage(err) });
};

module.exports = { errorHandler };
