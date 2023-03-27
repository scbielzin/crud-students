import { Router } from 'express';
import loginRequired from '../middlewares/loginRequired'

import FotoController from '../controllers/FotoController.js';

const router = new Router();

router.post('/', loginRequired, FotoController.store);

export default router;