import express from 'express';
import { toggleReadlist } from '../controllers/readlist.controller.js';

const router = express.Router();

//toggle readlist entry of a novel by specific user
router.post('/:id', toggleReadlist);

export default router;
