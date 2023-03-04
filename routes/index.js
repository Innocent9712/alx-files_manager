import express from 'express';
import appController from '../controller/AppController';
import userController from '../controller/UsersController';

const router = express.Router();

router.get('/status', (req, res) => appController.getStatus(req, res));

router.get('/stats', (req, res) => appController.getStats(req, res));

router.post('/users', (req, res) => userController.postNew(req, res));
export default router;
