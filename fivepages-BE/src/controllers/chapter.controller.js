import Novel from '../models/novel.models.js';
import Chapter from '../models/chapter.models.js';
import mongoose from 'mongoose';

// done and tested
export const createChapter = async (req, res) => {
  const { novelId, chapterNumber, title, content } = req.body;

  if (!novelId || (!chapterNumber && chapterNumber != 0) || isNaN(chapterNumber) || !content) {
    return res.status(400).json({ message: 'Novel ID, chapter number, and content are required' });
  }

  try {
    // Create chapter
    const chapter = await Chapter.create({ novel: novelId, chapterNumber, title: title ? title : "", content });

    // Push chapter to novel
    await Novel.findByIdAndUpdate(novelId, { $push: { chapters: chapter._id } });

    res.status(201).json(chapter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

//done
export const getAllChapters = async (req, res) => {
  const novelID = req.params.novelId;

  if (!novelID || typeof novelID !== 'string' || !novelID.trim() || !mongoose.Types.ObjectId.isValid(novelID)) {
    return res.status(400).json({ message: 'Novel ID is required' });
  }

  try {
    const chapters = await Chapter.find({ novel: novelID }).sort('chapterNumber');
    res.status(200).json(chapters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

//done and tested
export const getChapterByID = async (req, res) => {

  const chapterID = req.params.id;

  if (!chapterID || typeof chapterID !== 'string' || !chapterID.trim() || !mongoose.Types.ObjectId.isValid(chapterID)) {
    return res.status(400).json({ message: 'Invalid chapter ID' });
  }

  try {
    const chapter = await Chapter.findById(chapterID);

    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

    res.status(200).json(chapter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}