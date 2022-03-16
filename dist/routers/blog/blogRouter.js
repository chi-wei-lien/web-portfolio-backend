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
const express_1 = require("express");
const blogController_1 = __importDefault(require("../../controllers/blog/blogController"));
const auth_1 = __importDefault(require("../../middleware/auth"));
class blogRouter {
    constructor() {
        this._router = (0, express_1.Router)();
        this._controller = blogController_1.default;
        this._configure();
    }
    get router() {
        return this._router;
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    _configure() {
        this._router.get('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            return this._controller.getAllPublished(req, res);
        }));
        this._router.get('/admin', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            return this._controller.getAll(req, res);
        }));
        this._router.get('/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            return this._controller.findOne(req, res);
        }));
        this._router.post('/create', auth_1.default, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            return this._controller.create(req, res);
        }));
        this._router.post('/save', auth_1.default, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            return this._controller.save(req, res);
        }));
        this._router.post('/edit/:id', auth_1.default, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            return this._controller.edit(req, res);
        }));
        this._router.post('/delete/:id', auth_1.default, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            return this._controller.delete(req, res);
        }));
        this._router.post('/publish/:id', auth_1.default, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            return this._controller.publish(req, res);
        }));
        this._router.post('/unpublish/:id', auth_1.default, (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            return this._controller.unPublish(req, res);
        }));
    }
}
module.exports = new blogRouter().router;
