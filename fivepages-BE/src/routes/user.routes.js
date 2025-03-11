import Router from 'express'

const router = Router();

router.post('/register', (req, res) => {});

router.get('/login', (req, res) => {
  res.json({ message: 'Login route' });
});

export default router;