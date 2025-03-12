import Novel from "../models/novel.models.js";
import mongoose from 'mongoose';

//done and tested
export const getNovels = async (req, res) => {
  try {
    const novels = await Novel.find();
    res.status(200).json(novels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//done and tested
export const getNovelByID = async (req, res) => {
  try {
    const novelID = req.params.id;

    if(!novelID || typeof novelID !== 'string' || !novelID.trim() || !mongoose.Types.ObjectId.isValid(novelID)) {
      return res.status(400).json({ message: 'Novel ID is required' });
    }

    const novel = await Novel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(novelID) } },
      {
      $lookup: {
        from: 'chapters',
        localField: '_id',
        foreignField: 'novel',
        as: 'chapters'
      }
      },
      {
      $project: {
        _id: 1,
        title: 1,
        author: 1,
        publishedYear: 1,
        synopsis: 1,
        rating: 1,
        type: 1,
        language: 1,
        tags: 1,
        chapters: { _id: 1, title: 1 }
      }
      }
    ]);

    if (!novel) return res.status(404).json({ message: 'Novel not found' });

    res.status(200).json(novel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//done and tested
export const createNovel = async (req, res) => {

  const { title, author, publishedYear, synopsis, rating, type, language, tags } = req.body;

  // Validate request body
  if (!req.body.title || !req.body.author || !req.body.publishedYear || !req.body.synopsis || !req.body.tags) {
    return res.status(400).json({ message: 'Title, author, tags and published year are required' });
  }

  // Check if novel already exists
  const existingNovel = await Novel.findOne({ title: req.body.title, author: req.body.author });
  if (existingNovel) {
    return res.status(400).json({ message: 'Novel already exists' });
  }

  try {
    const novel = await Novel.create(
      { title, author, publishedYear, synopsis, rating: rating ? rating : 5, type: type ? type : "NA", language: language ? language : "NA", tags}
    );
    res.status(201).json(novel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export const deleteNovel = async (req, res) => {
  try {
    const novel = await Novel.findByIdAndDelete(req.params.id);
    if (!novel) return res.status(404).json({ message: 'Novel not found' });
    res.status(200).json({ message: 'Novel deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}