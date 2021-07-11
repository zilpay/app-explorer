import express from 'express';
import { adsRouter } from './ads';
import { AppsRouter } from './app';

export const router = express();

router.use(adsRouter);
router.use(AppsRouter);
