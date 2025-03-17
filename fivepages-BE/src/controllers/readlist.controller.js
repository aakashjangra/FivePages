import mongoose from "mongoose";
import Novel from "../models/novel.models.js";
import Readlist from "../models/readlist.models.js";

// done and tested
export const toggleReadlist = async (req, res) => {
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

    // Check if readlist item already exists
    let readListItem = await Readlist.findOne({ user, novel });

    if (readListItem) {
      // If exists, toggle the bookmarked field
      readListItem.bookmarked = !readListItem.bookmarked;
    } else {
      // If not exists, create new and set bookmarked to true
      readListItem = new Readlist({
        user,
        novel,
        bookmarked: true
      });
    }

    await readListItem.save();

    // Return user and novel details
    const result = await Readlist.findById(readListItem._id)
      .populate('user', 'name email') // Get only name and email from user
      .populate('novel', 'title') // Get only title from novel
      .lean();

    result.bookmarked = readListItem.bookmarked;

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
