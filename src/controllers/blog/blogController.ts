import Blog from '../../models/blog';

import { Request, Response } from 'express';

class BlogController {
  async getAllPublished(req: Request, res: Response) {
    var query = { published: true };
    const blogs = await Blog.find(query);
    res.send(blogs);
    console.log(blogs);
  }

  async getAll(req: Request, res: Response) {
    const blogs = await Blog.find();
    res.send(blogs);
    console.log(blogs);
  }

  async findOne(req: Request, res: Response) {
    var query = { _id: req.params.id };
    const blog = await Blog.find(query);
    res.send(blog);
    console.log(blog);
  }

  async create(req: Request, res: Response) {
    var newBlog = new Blog({
      title: req.body.blogTitle,
      content: req.body.blogContent,
      date: new Date,
      pic: req.body.blogPic,
      preview: req.body.blogPreview,
      published: false
    });
    newBlog.save((err, doc) => {
      if (!err)
        res.status(200).json({success: "blog saving succeed"})
      else
        res.status(500).json({success: "blog saving failed"})
    });
  }

  async edit(req: Request, res: Response) {
    var query = { _id: req.params.id };
    const blog = await Blog.find(query);
    res.send(blog);
    console.log(blog);
  }

  async save(req: Request, res: Response) {
    var query = { _id: req.body.id };
    var newBlog = new Blog({
      _id: req.body.id,
      title: req.body.blogTitle,
      content: req.body.blogContent,
      date: new Date,
      pic: req.body.blogPic,
      preview: req.body.blogPreview,
      published: false
    });
    Blog.updateOne(query, newBlog, function(err: Error) {
      if (!err) {
        console.log("success update")
        res.status(200).json({success: "blog saving succeed"});
      } else {
        console.log(err)
        res.status(500).json({success: "blog saving failed"});
      }
    });
  }

  async delete(req: Request, res: Response) {
    var query = { _id: req.params.id };
    Blog.deleteOne(query, function(err: Error) {
      if (!err) {
        console.log("success delete")
        res.status(200).json({success: "blog deletion succeed"});
      } else {
        console.log(err)
        res.status(500).json({success: "blog deletion failed"});
      }
    });
  }

  async publish(req: Request, res: Response) {
    var query = { _id: req.params.id };
    const blog = await Blog.find(query);
    var newBlog = new Blog({
      _id: req.params.id,
      title: blog[0].title,
      content: blog[0].content,
      date: new Date,
      pic: blog[0].pic,
      published: true
    });
    Blog.updateOne(query, newBlog, function(err: Error) {
      if (!err) {
        console.log("success update")
        res.status(200).json({success: "blog saving succeed"});
      } else {
        console.log(err)
        res.status(500).json({success: "blog saving failed"});
      }
    });
  }

  async unPublish(req: Request, res: Response) {
    var query = { _id: req.params.id };
    const blog = await Blog.find(query);
    var newBlog = new Blog({
      _id: req.params.id,
      title: blog[0].title,
      content: blog[0].content,
      date: new Date,
      pic: blog[0].pic,
      published: false
    });
    Blog.updateOne(query, newBlog, function(err: Error) {
      if (!err) {
        console.log("success update")
        res.status(200).json({success: "blog saving succeed"});
      } else {
        console.log(err)
        res.status(500).json({success: "blog saving failed"});
      }
    });
  }
}

export = new BlogController();