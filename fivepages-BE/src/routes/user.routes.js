import Router from 'express'
import { body } from 'express-validator';
import { changePassword, createUser, loginUser, updateUserBasicInfo, getUserProfile  } from '../controllers/user.controllers.js';
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
router.get('/getUser', verifyJWT, getUserProfile);
router.patch('/updateProfile', verifyJWT, updateUserBasicInfo);

// forget password ki api bnani s


export default router;