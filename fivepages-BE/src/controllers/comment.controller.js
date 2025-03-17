import mongoose from "mongoose";
import Comment from "../models/comment.models.js";

// @desc Create a comment
// @route POST /api/comments
// @access Private
export const createComment = async (req, res) => {
  const { content, novelID, chapterID } = req.body;

  if ((!novelID && !chapterID) || (novelID && chapterID)) {
    return res.status(400).json({ message: 'Comment must be for either a novel or a chapter, not both.' });
  }

  if(!content){
    return res.status(400).json({ message: 'Comment content is missing!' });
  }

  try {
    const comment = new Comment({
      content,
      user: req.user._id,
      novel: novelID || undefined,
      chapter: chapterID || undefined
    });

    await comment.save();
    await comment.populate('user', 'name email');

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get comments for a novel or chapter
// @route GET /api/comments/:id
// @access Public
export const getComments = async (req, res) => {
  const { id } = req.params;
  const { type } = req.query; // 'novel' or 'chapter'

  if (!id || !type) {
    return res.status(400).json({ message: 'ID and type (novel/chapter) are required.' });
  }

  try {
    const comments = await Comment.find({ [type]: id })
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update a comment
// @route PUT /api/comments/:id
// @access Private
export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid comment ID' });
  }

  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the user owns the comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    comment.content = content || comment.content;
    await comment.save();

    await comment.populate('user', 'name email');

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete a comment
// @route DELETE /api/comments/:id
// @access Private
export const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the user owns the comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await comment.deleteOne();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
