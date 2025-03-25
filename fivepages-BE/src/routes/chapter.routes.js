import express from 'express';
import Chapter from '../models/chapter.models.js';
import Novel from '../models/novel.models.js';
import { createChapter, getAllChapters, getChapterByID, getLatestChapters } from '../controllers/chapter.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Create a new chapter
router.post('/add', verifyJWT, createChapter);

// Get all chapters for a specific novel
router.get('/novel/:novelId', getAllChapters);

//get latest chapters
router.get('/latest', getLatestChapters);

// Get a single chapter by ID
router.get('/:id', getChapterByID);

export default router;
