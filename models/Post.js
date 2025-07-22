const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: "text" },
    content: { type: String, required: true, index: "text" },
    category: { type: String, required: true, index: "text" },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

// Create a text index for wildcard search on title, content, category
postSchema.index({ title: "text", content: "text", category: "text" });

module.exports = mongoose.model("Post", postSchema);
