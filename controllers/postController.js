const { validationResult } = require("express-validator");
const Post = require("../models/Post");

// Wrap async functions to automatically forward errors
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/** Build search query for partial, case‑insensitive matches across fields. */
const buildSearchQuery = (term) => {
  const regex = new RegExp(term, "i"); // i = case‑insensitive
  return {
    $or: [
      { title: regex },
      { content: regex },
      { category: regex },
      { tags: regex },
    ],
  };
};

// ------------------ CRUD Controllers ------------------

// Create a new blog post
exports.createPost = asyncHandler(async (req, res) => {
  console.time("createPost");

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content, category, tags } = req.body;
  const post = await Post.create({ title, content, category, tags });

  console.timeEnd("createPost");
  res.status(201).json(post);
});

// Get all posts (optional term filter)
exports.getAllPosts = asyncHandler(async (req, res) => {
  console.time("getAllPosts");
  const { term } = req.query;

  const query = term ? buildSearchQuery(term) : {};
  const posts = await Post.find(query).sort({ createdAt: -1 });

  console.timeEnd("getAllPosts");
  res.json(posts);
});

// Get a single post by ID
exports.getPostById = asyncHandler(async (req, res) => {
  console.time("getPostById");
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  console.timeEnd("getPostById");
  res.json(post);
});

// Update a post
exports.updatePost = asyncHandler(async (req, res) => {
  console.time("updatePost");

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { title, content, category, tags } = req.body;
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { title, content, category, tags },
    { new: true, runValidators: true }
  );

  if (!post) return res.status(404).json({ error: "Post not found" });
  console.timeEnd("updatePost");
  res.json(post);
});

// Delete a post
exports.deletePost = asyncHandler(async (req, res) => {
  console.time("deletePost");
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  console.timeEnd("deletePost");
  res.status(204).send();
});
