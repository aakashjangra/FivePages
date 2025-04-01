import Router from 'express'
import { body } from 'express-validator';
import { changePassword, createUser, loginUser } from '../controllers/user.controllers.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

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

router.post('/login', loginUser);

router.patch('/change-password', verifyJWT, changePassword);

// forget password ki api bnani s
// logout ki bhi 

export default router;