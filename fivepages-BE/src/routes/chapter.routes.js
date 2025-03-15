import express from 'express';
import Chapter from '../models/chapter.models.js';
import Novel from '../models/novel.models.js';
import { createChapter, getAllChapters, getChapterByID } from '../controllers/chapter.controller.js';

const router = express.Router();

// Create a new chapter
router.post('/add', createChapter);

// Get all chapters for a specific novel
router.get('/novel/:novelId', getAllChapters);

// Get a single chapter by ID
router.get('/:id', getChapterByID);

export default router;
