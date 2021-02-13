import express from 'express';

import { appInfo } from './app';
import { uploadRouter } from './upload';

export const router = express();

router.use('/api/v1/', appInfo);
router.use('/api/v1/', uploadRouter);
