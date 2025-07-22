// File: routes/postRoutes.js
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const ctrl = require("../controllers/postController");

// Validation chain (shared by create & update)
const validatePost = [
  body("title").isString().notEmpty().withMessage("Title is required"),
  body("content").isString().notEmpty().withMessage("Content is required"),
  body("category").isString().notEmpty().withMessage("Category is required"),
  body("tags").optional().isArray().withMessage("Tags must be an array"),
];

router.post("/", validatePost, ctrl.createPost);
router.get("/", ctrl.getAllPosts);
router.get("/:id", ctrl.getPostById);
router.put("/:id", validatePost, ctrl.updatePost);
router.delete("/:id", ctrl.deletePost);

module.exports = router;
