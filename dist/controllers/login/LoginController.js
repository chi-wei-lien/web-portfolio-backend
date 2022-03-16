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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const user_1 = __importDefault(require("../../models/user"));
const admin_1 = __importDefault(require("../../models/admin"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class LoginController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            user_1.default.findOne({ email: req.body.user.email })
                .then((user) => __awaiter(this, void 0, void 0, function* () {
                if (!user) {
                    const newUser = new user_1.default({ email: req.body.user.email });
                    newUser.save()
                        .then(user => {
                        res.status(200).json({ admin: false });
                    })
                        .catch(error => {
                        res.status(500).json(error);
                    });
                }
                else {
                    admin_1.default.findOne({ email: req.body.user.email })
                        .then(user => {
                        if (user) {
                            res.status(200).json({ token: generateToken(user), admin: true });
                            return;
                        }
                        else {
                            res.status(200).json({ admin: false });
                        }
                    });
                }
            }));
        });
    }
    check(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                        res.status(200).json({ success: "welcome" });
                    }
                });
            }
        });
    }
}
function generateToken(user) {
    return jsonwebtoken_1.default.sign({ data: user }, process.env.TOCKEN_SECRET || "", { expiresIn: 60 * 60 * 10 });
}
module.exports = new LoginController();
