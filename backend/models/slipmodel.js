import mongoose from 'mongoose';

const slipSchema =mongoose.Schema(
    {
  User_ID: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  Value: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    
  },
  imagePath: {
    type: String,
    required: true
  }
});

const Slip = mongoose.model('Slip', slipSchema);

export default Slip;
