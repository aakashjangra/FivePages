import mongoose from 'mongoose';

const novelSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    synopsis: { type: String, required: true }, //description or summary of the novel
    rating: { type: Number, min: 0, max: 5 },
    type: {
      type: String, enum: ['Light Novel', 'Web Novel', 'Published', 'NA']
    },
    language: { type: String, enum: ['English', 'Chinese', 'Korean', 'Japanese'] },
    tags: { type: [String], required: true },
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }]  
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Novel = mongoose.model('Novel', novelSchema);

export default Novel;
