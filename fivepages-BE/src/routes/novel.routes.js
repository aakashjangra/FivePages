import { createNovel, deleteNovel, getNovelByID, getNovels } from '../controllers/novel.controllers.js';
import Novel from '../models/novel.models.js';
import Router from 'express';

const router = Router();

// Get all novels
router.get('/', getNovels);

// Get a single novel by ID
router.get('/:id', getNovelByID);

// Create a new novel
router.post('/', createNovel);

// Update a novel by ID
router.put('/:id', getNovelByID);

// Delete a novel by ID
router.delete('/:id', deleteNovel);

export default router;