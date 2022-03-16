import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const getAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.token;
    if (!token) {
        res.status(403).json({ error: "please log in" });
        return;
    } else {
      jwt.verify(token, process.env.TOCKEN_SECRET || "", (err: any, value: any) => {
        if (err) {
            res.status(403).json({ error: 'failed to authenticate token' })
            return;
        } else {
            next();
        }
      })
    }
}

export default getAuth;