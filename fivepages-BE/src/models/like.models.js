import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    novel: { type: mongoose.Schema.Types.ObjectId, ref: 'Novel', required: true },
    liked: { type: Boolean, required: true }
  },
  {
    timestamps: true
  }
);

// Prevent duplicate entries for the same user and novel
likeSchema.index({ user: 1, novel: 1 }, { unique: true });

const Like = mongoose.model('Like', likeSchema);

export default Like;
