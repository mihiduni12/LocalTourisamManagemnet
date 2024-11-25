import mongoose from 'mongoose';

const billschema =mongoose.Schema(
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
  type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }

});

const Bill = mongoose.model('bill', billschema);

export default Bill;
