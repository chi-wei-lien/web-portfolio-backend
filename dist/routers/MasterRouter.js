"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const blogRouter_1 = __importDefault(require("./blog/blogRouter"));
const LoginRouter_1 = __importDefault(require("./login/LoginRouter"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const dotenv_1 = __importDefault(require("dotenv"));
// load the environment variables from the .env file
dotenv_1.default.config({
    path: '.env'
});
const allowedOrigins = ['https://loophole.engineer', 'http://localhost:3000'];
const options = {
    origin: allowedOrigins,
    credentials: true
};
const mongoStore = (0, connect_mongodb_session_1.default)(express_session_1.default);
let store;
if (process.env.DB_CONN_STRING != null) {
    store = new mongoStore({
        collection: "userSessions",
        uri: process.env.DB_CONN_STRING,
        expires: 10000,
    });
}
class MasterRouter {
    constructor() {
        this._router = (0, express_1.Router)();
        this._subBlogRouter = blogRouter_1.default;
        this._subUserRouter = LoginRouter_1.default;
        this._configure();
    }
    get router() {
        return this._router;
    }
    /**
     * Connect routes to their matching routers.
     */
    _configure() {
        this._router.use((0, cors_1.default)(options));
        this._router.use('/blogs', this._subBlogRouter);
        this._router.use('/login', this._subUserRouter);
    }
}
module.exports = new MasterRouter().router;
