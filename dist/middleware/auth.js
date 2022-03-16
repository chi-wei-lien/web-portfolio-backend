"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAuth = (req, res, next) => {
    const token = req.body.token;
    if (!token) {
        res.status(403).json({ error: "please log in" });
        return;
    }
    else {
        jsonwebtoken_1.default.verify(token, process.env.TOCKEN_SECRET || "", (err, value) => {
            if (err) {
                res.status(403).json({ error: 'failed to authenticate token' });
                return;
            }
            else {
                next();
            }
        });
    }
};
exports.default = getAuth;
