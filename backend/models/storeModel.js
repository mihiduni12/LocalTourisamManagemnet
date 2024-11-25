import mongoose from "mongoose";

const Schema = mongoose.Schema;

const catagorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
);

export const Catagory = mongoose.model("newcatagories", catagorySchema);

const productsSchema = new Schema({  
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  discPrice: {
    type: String,
  },
  image: {
    type: String,
  },
  type: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  nameDesc: {
    type: String,
  },
  Desc: {
    type: String,
  },
});

export const Products = mongoose.model("products", productsSchema);

const OffersSchema = new Schema({
  _id: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  discPrice: {
    type: String,
  },
  image: {
    type: String,
  },
});

export const Offers = mongoose.model("offers", OffersSchema);

const ItemsSchema = new Schema({
  productId: {
    type: String,
  }
});

export const List = mongoose.model("items", ItemsSchema);

const cartSchema = new Schema({
  userID: {
    type: String,
  },
  products: {
    type: String,
  },
});

export const Cart = mongoose.model("Productcarts", cartSchema);
