import express from 'express';
import { toggleLike } from '../controllers/like.controller.js';

const router = express.Router();

//toggle like entry of a novel by specific user
router.post('/:id', toggleLike);

export default router;
