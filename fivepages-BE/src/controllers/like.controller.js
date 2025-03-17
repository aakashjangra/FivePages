import mongoose from "mongoose";
import Novel from "../models/novel.models.js";
import Like from "../models/like.models.js";

// done and tested
export const toggleLike = async (req, res) => {
  const novelID = req.params.id;

  if (
    !novelID ||
    typeof novelID !== 'string' ||
    !novelID.trim() ||
    !mongoose.Types.ObjectId.isValid(novelID)
  ) {
    return res.status(400).json({ message: 'Valid Novel ID is required' });
  }

  try {
    const novel = await Novel.findById(novelID);
    if (!novel) {
      return res.status(404).json({ message: 'Novel not found' });
    }

    const user = req.user._id;

    // Check if likeItem already exists
    let likeItem = await Like.findOne({ user, novel });

    if (likeItem) {
      // If exists, toggle the liked field
      likeItem.liked = !likeItem.liked;
    } else {
      // If not exists, create new and set liked to true
      likeItem = new Like({
        user,
        novel,
        liked: true
      });
    }

    await likeItem.save();

    // Return user and novel details
    const result = await Like.findById(likeItem._id)
      .populate('user', 'name email') // Get only name and email from user
      .populate('novel', 'title') // Get only title from novel
      .lean();

    result.bookmarked = likeItem.bookmarked;

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
