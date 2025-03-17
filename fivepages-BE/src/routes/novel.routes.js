import { createNovel, deleteNovel, getNovelByID, getNovels, getRecommendedNovels } from '../controllers/novel.controllers.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import Novel from '../models/novel.models.js';
import Router from 'express';

const router = Router();

// Get all novels
router.get('/', getNovels);

// Get a single novel by ID
router.get('/:id', getNovelByID);

router.get('/:id/:count', getRecommendedNovels);

// Create a new novel
router.post('/', verifyJWT, upload.single('thumbnail'), createNovel);

// Update a novel by ID
// router.put('/:id', verifyJWT, getNovelByID);

// Delete a novel by ID
router.delete('/:id', verifyJWT, deleteNovel);

export default router;