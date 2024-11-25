import mongoose from 'mongoose';

const payschema =mongoose.Schema(
    {
  User_ID: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  Value: {
    type: Number,
    required: true
  },
  pmethod: {
    type: String,
    required: true
  }
});

const Pay = mongoose.model('Pay', payschema);

export default Pay;
