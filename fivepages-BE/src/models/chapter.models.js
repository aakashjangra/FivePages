import mongoose from 'mongoose';

const chapterSchema = new mongoose.Schema(
  {
    chapterNumber: { type: Number, required: true },
    title: { type: String }, //optional
    content: { type: String, required: true },
    novel: { type: mongoose.Schema.Types.ObjectId, ref: 'Novel', required: true }
  },
  {
    timestamps: true
  }
);

const Chapter = mongoose.model('Chapter', chapterSchema);

export default Chapter;
