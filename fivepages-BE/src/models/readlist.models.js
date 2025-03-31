import mongoose from 'mongoose';
import { applyISTConversion } from '../middlewares/schema.middleware.js';

const readlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    novel: { type: mongoose.Schema.Types.ObjectId, ref: 'Novel', required: true },
    bookmarked: {type: Boolean, required: true}
  },
  {
    timestamps: true
  }
);

// Middleware to convert timestamps to IST before saving
applyISTConversion(readlistSchema);

// Prevent duplicate entries for the same user and novel
readlistSchema.index({ user: 1, novel: 1 }, { unique: true });

const Readlist = mongoose.model('Readlist', readlistSchema);

export default Readlist;
