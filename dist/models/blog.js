"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true },
    pic: { type: String },
    published: { type: Boolean, required: true, default: false }
});
exports.default = (0, mongoose_1.model)('Blog', schema);
