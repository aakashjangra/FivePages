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

    const existingChapter = await Chapter.findOne({ novel: novelId, chapterNumber });

    if (existingChapter) {
      return res.status(400).json({ message: 'Chapter number already exists' });
    }

    // Create chapter
    const chapter = await Chapter.create({ novel: novelId, chapterNumber, title: title ? title : "", content });

    // Push chapter to novel
    await Novel.findByIdAndUpdate(novelId, { $push: { chapters: chapter._id } });

    res.status(201).json(chapter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

//done  and tested
export const updateChapter = async (req, res) => {
  const chapterID = req.params.id;
  const { title, novelID, chapterNumber, content } = req.body;

  // console.log(chapterID, title, chapterNumber, content)

  if (!novelID || typeof novelID !== 'string' || !novelID.trim() || !mongoose.Types.ObjectId.isValid(novelID)) {
    return res.status(400).json({ message: 'novelID is required!' });
  }

  if (!chapterID || typeof chapterID !== 'string' || !chapterID.trim() || !mongoose.Types.ObjectId.isValid(chapterID)) {
    return res.status(400).json({ message: 'Invalid chapter ID' });
  }

  

  if (!content && !title && !chapterNumber) {
    return res.status(400).json({ message: 'Content, title or chapterNumber is required' });
  }

  // Check if the chapterNumber already exists for the same novel
  const chapterWithChapterNumber = await Chapter.findOne({ chapterNumber, novel: novelID});

  if (chapterWithChapterNumber && chapterWithChapterNumber._id.toString() !== chapterID ) {
    return res.status(400).json({ message: 'Chapter number already exists' });
  }
  
  try {
    const exixtingChapter = await Chapter.findById(chapterID);
    if (!exixtingChapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (chapterNumber !== undefined) updateData.chapterNumber = chapterNumber;
    const updatedChapter = await Chapter.findByIdAndUpdate(
      chapterID,
      updateData,
      { new: true, runValidators: true }
    );

    // Update the novel's updatedAt field
    // await Novel.findByIdAndUpdate(novelID, { updatedAt: new Date() });

    return res.status(200).json(updatedChapter);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getLatestChapters = async (req, res) => {
  const count = Number(req.query.count) || 10;

  try {
    const chapters = await Chapter.find()
      .populate('novel', 'title author thumbnail')
      .select('_id title chapterNumber updatedAt novel')
      .sort({ createdAt: -1 })
      .limit(count);

    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


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

export const deleteChapter = async (req, res) => {
  const chapterID = req.params.id;

  if (!chapterID || typeof chapterID !== 'string' || !chapterID.trim() || !mongoose.Types.ObjectId.isValid(chapterID)) {
    return res.status(400).json({ message: 'Invalid chapter ID' });
  }

  try {
    const chapter = await Chapter.findById(chapterID);

    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    // Remove chapter reference from the novel
    await Novel.findByIdAndUpdate(chapter.novel, { $pull: { chapters: chapterID } });

    // Delete the chapter
    const deletedChapter = await Chapter.findByIdAndDelete(chapterID);

    res.status(200).json({ message: 'Chapter deleted successfully', deletedChapter });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};