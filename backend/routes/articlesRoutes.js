import express from "express";
import Article from "../models/articles.models.js";

const artrouter = express.Router();

// Create a new article
artrouter.post("/", async (req, res) => {
  try {
    req.body.views = 0;
    const newArticle = await Article.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        article: newArticle,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

// Get article based on ID
artrouter.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.status(200).json({ article });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Article not found",
    });
  }
});

// Search functionality and category wise load articles
artrouter.get("/", async (req, res) => {
  try {
    const { title, category } = req.query;
    let query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    const articles = await Article.find(query);

    if (articles.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "No articles found with the specified criteria",
      });
    }

    res.status(200).json({ articles });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

// Update details
artrouter.patch("/:id", async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        article,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

// Delete
artrouter.delete("/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Article not found",
    });
  }
});

// Auto-increment views by 1 for a specific article
artrouter.put("/increment-views/:id", async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } }, // Increment views by 1
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        article,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

export default artrouter;
