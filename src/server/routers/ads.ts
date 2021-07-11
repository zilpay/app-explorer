import express, { Request, Response, NextFunction } from 'express';
import { RedisClient, RedisKeys } from '../../redis';

export const adsRouter = express();
const redis = new RedisClient();

adsRouter.get('/ads', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await redis.getAsync(RedisKeys.AdsList);

    return res.status(200).send(list);
  } catch (err) {
    return res.status(500).json({
      code: -1,
      message: err.message
    });
  }
});
