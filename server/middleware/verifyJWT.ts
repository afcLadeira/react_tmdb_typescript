import { NextFunction, Request, Response } from "express"

import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'


interface IGetUserAuthInfoRequest extends Request {
    user: string 
  }

const verifyJWT = (req : IGetUserAuthInfoRequest,res : Response,next : NextFunction) => {

    const authHeader = req.headers['authorization']

    if (!authHeader) return res.sendStatus(401)

    const token = authHeader.split(' ')[1]

    let mysecret = process.env.ACCESS_TOKEN_SECRET as string

    // jwt.verify(token,mysecret, (err : VerifyErrors, decoded : JwtPayload  ) => {
    jwt.verify(token,mysecret, (err : any, decoded : any  ) => {


        if (err) return res.sendStatus(403) //invalid token
        req.user = decoded!.userName
        next()
    })

}


module.exports = { verifyJWT }