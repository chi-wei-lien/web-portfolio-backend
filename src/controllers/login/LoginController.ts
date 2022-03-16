import { ObjectId } from "mongodb";
import User from "../../models/user";
import Admin from "../../models/admin";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response, Router } from 'express';

class LoginController {
  async login(req: Request, res: Response) {
    User.findOne({ email: req.body.user.email })
      .then(async user => {
        if (!user) {
          const newUser = new User({ email: req.body.user.email })
          newUser.save()
            .then(user => {
              res.status(200).json({ admin: false })
            })
            .catch(error => {
              res.status(500).json(error)
            })
        } else {
          Admin.findOne({ email: req.body.user.email })
            .then(user => {
              if (user) {
                res.status(200).json({ token: generateToken(user), admin: true })
                return;
              } else {
                res.status(200).json({ admin: false })
              }
            })
        }
      })
  }

  async check(req: Request, res: Response) {
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
          res.status(200).json({ success: "welcome" });
        }
      })
    }
  }
}

function generateToken(user: any) {
  return jwt.sign({ data: user }, process.env.TOCKEN_SECRET || "", { expiresIn: 60 * 60 * 10 })
}

export = new LoginController();