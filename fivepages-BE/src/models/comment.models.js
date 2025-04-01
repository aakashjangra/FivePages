import mongoose from 'mongoose';
import { applyISTConversion } from '../middlewares/schema.middleware.js';

// comment can be either for a chapter or a novel
// can't be both
const commentSchema = new mongoose.Schema(
  {
    content: {type: String, required: true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    novel: { type: mongoose.Schema.Types.ObjectId, ref: 'Novel'},
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
  },
  {
    timestamps: true
  }
);

applyISTConversion(commentSchema);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
