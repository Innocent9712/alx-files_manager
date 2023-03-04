import express from 'express';
import appController from '../controller/AppController';
import userController from '../controller/UsersController';
import authController from '../controller/AuthController';

const router = express.Router();

// Get db status
router.get('/status', (req, res) => appController.getStatus(req, res));
// Get db and redis stats
router.get('/stats', (req, res) => appController.getStats(req, res));
// Create new user
router.post('/users', (req, res) => userController.postNew(req, res));
// Get user by token
router.get('/users/me', (req, res) => userController.getMe(req, res));
// Connect user and create new session
router.get('/connect', (req, res) => authController.getConnect(req, res));
// Disconnect user and remove session
router.get('/disconnect', (req, res) => authController.getDisconnect(req, res));

export default router;
