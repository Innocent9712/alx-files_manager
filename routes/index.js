import express from 'express';
import appController from '../controller/AppController';

const router = express.Router();

router.get('/status', (req, res) => appController.getStatus(req, res));

router.get('/stats', (req, res) => appController.getStats(req, res));

export default router;
