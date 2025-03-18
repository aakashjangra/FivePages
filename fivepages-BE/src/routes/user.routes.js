import Router from 'express'
import { body } from 'express-validator';
import { createUser, loginUser } from '../controllers/user.controllers.js';

const router = Router();

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('name').notEmpty().withMessage('Name is required')
  ],
  createUser
);

router.get('/login', loginUser);
router.post('/login', loginUser);

export default router;