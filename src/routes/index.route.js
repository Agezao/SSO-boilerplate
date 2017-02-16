import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at api/user
router.use('/user', userRoutes);

// mount auth routes at api/
router.use('/', authRoutes);

export default router;
