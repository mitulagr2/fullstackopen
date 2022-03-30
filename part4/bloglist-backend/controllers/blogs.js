const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  res.json(blogs);
});

blogsRouter.post("/", async (req, res) => {
  const user = req.user;
  const blog = new Blog({
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  const user = req.user;

  if (user.id === blog.user._id.toString()) {
    await blog.remove();
    return res.status(204).end();
  }
  res.status(400).json({ error: "incorrect user" });
});

blogsRouter.put("/:id", async (req, res) => {
  const updatedBlog = await Blog.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { likes: req.body.likes } },
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );
  res.json(updatedBlog);
});

module.exports = blogsRouter;
