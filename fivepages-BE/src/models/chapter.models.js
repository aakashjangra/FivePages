import mongoose from 'mongoose';
import { applyISTConversion } from '../middlewares/schema.middleware.js';

const chapterSchema = new mongoose.Schema(
  {
    chapterNumber: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    novel: { type: mongoose.Schema.Types.ObjectId, ref: 'Novel', required: true }
  },
  {
    timestamps: true
  }
);


applyISTConversion(chapterSchema);

const Chapter = mongoose.model('Chapter', chapterSchema);

export default Chapter;
