import Novel from '../models/novel.models.js';
import Chapter from '../models/chapter.models.js';


export const createChapter = async (req, res) => {
  const { novelId, chapterNumber, title, content, spaces } = req.body;

  try {
    // Create chapter
    const chapter = await Chapter.create({ novel: novelId, chapterNumber, title, content, spaces });

    // Push chapter to novel
    await Novel.findByIdAndUpdate(novelId, { $push: { chapters: chapter._id } });

    res.status(201).json(chapter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export const getAllChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find({ novel: req.params.novelId }).sort('chapterNumber');
    res.status(200).json(chapters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getChapterByID = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
    res.status(200).json(chapter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}