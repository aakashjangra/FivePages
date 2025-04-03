import express from 'express';
import { getReadlist, toggleReadlist } from '../controllers/readlist.controller.js';

const router = express.Router();

//toggle readlist entry of a novel by specific user
router.post('/:id', toggleReadlist);

router.get('/', getReadlist);

export default router;
