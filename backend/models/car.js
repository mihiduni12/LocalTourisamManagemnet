import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  maxPersons: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Car = mongoose.model("Car", carSchema);

export default Car;
