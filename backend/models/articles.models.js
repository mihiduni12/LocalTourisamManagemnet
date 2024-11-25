import mongoose from "mongoose";

const { Schema } = mongoose;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  views: {
    type: Number,
  }

});

const Article = mongoose.model("Article", articleSchema);

export default Article;
