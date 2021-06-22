import express from 'express';

import { uploadRouter } from './upload';

export const router = express();

router.use('/api/v1/', uploadRouter);
