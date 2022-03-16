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
const blog_1 = __importDefault(require("../../models/blog"));
class BlogController {
    getAllPublished(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = { published: true };
            const blogs = yield blog_1.default.find(query);
            res.send(blogs);
            console.log(blogs);
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield blog_1.default.find();
            res.send(blogs);
            console.log(blogs);
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = { _id: req.params.id };
            const blog = yield blog_1.default.find(query);
            res.send(blog);
            console.log(blog);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var newBlog = new blog_1.default({
                title: req.body.blogTitle,
                content: req.body.blogContent,
                date: new Date,
                pic: req.body.blogPic,
                published: false
            });
            newBlog.save((err, doc) => {
                if (!err)
                    res.status(200).json({ success: "blog saving succeed" });
                else
                    res.status(500).json({ success: "blog saving failed" });
            });
        });
    }
    edit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = { _id: req.params.id };
            const blog = yield blog_1.default.find(query);
            res.send(blog);
            console.log(blog);
        });
    }
    save(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = { _id: req.body.id };
            var newBlog = new blog_1.default({
                _id: req.body.id,
                title: req.body.blogTitle,
                content: req.body.blogContent,
                date: new Date,
                pic: req.body.blogPic,
                published: false
            });
            blog_1.default.updateOne(query, newBlog, function (err) {
                if (!err) {
                    console.log("success update");
                    res.status(200).json({ success: "blog saving succeed" });
                }
                else {
                    console.log(err);
                    res.status(500).json({ success: "blog saving failed" });
                }
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = { _id: req.params.id };
            blog_1.default.deleteOne(query, function (err) {
                if (!err) {
                    console.log("success delete");
                    res.status(200).json({ success: "blog deletion succeed" });
                }
                else {
                    console.log(err);
                    res.status(500).json({ success: "blog deletion failed" });
                }
            });
        });
    }
    publish(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = { _id: req.params.id };
            const blog = yield blog_1.default.find(query);
            var newBlog = new blog_1.default({
                _id: req.params.id,
                title: blog[0].title,
                content: blog[0].content,
                date: new Date,
                pic: blog[0].pic,
                published: true
            });
            blog_1.default.updateOne(query, newBlog, function (err) {
                if (!err) {
                    console.log("success update");
                    res.status(200).json({ success: "blog saving succeed" });
                }
                else {
                    console.log(err);
                    res.status(500).json({ success: "blog saving failed" });
                }
            });
        });
    }
    unPublish(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = { _id: req.params.id };
            const blog = yield blog_1.default.find(query);
            var newBlog = new blog_1.default({
                _id: req.params.id,
                title: blog[0].title,
                content: blog[0].content,
                date: new Date,
                pic: blog[0].pic,
                published: false
            });
            blog_1.default.updateOne(query, newBlog, function (err) {
                if (!err) {
                    console.log("success update");
                    res.status(200).json({ success: "blog saving succeed" });
                }
                else {
                    console.log(err);
                    res.status(500).json({ success: "blog saving failed" });
                }
            });
        });
    }
}
module.exports = new BlogController();
