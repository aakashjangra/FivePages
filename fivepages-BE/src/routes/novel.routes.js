import { createNovel, deleteNovel, getNovelByID, getNovels, getRecommendedNovels, searchNovels } from '../controllers/novel.controllers.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import Novel from '../models/novel.models.js';
import Router from 'express';

const router = Router();

// Get all novels
router.get('/', getNovels);

//search novels
router.get('/search/:param', searchNovels);

// Get a single novel by ID
router.get('/:id', getNovelByID);

router.get('/:id/:count', getRecommendedNovels);

// Create a new novel
router.post('/', upload.single('thumbnail'), verifyJWT, createNovel);

// Update a novel by ID
// router.put('/:id', verifyJWT, getNovelByID);

// Delete a novel by ID
router.delete('/:id', verifyJWT, deleteNovel);

export default router;