import express, { Request, Response, NextFunction } from 'express';
import { RedisClient, RedisKeys } from '../../redis';

export const AppsRouter = express();
const redis = new RedisClient();

AppsRouter.get('/apps/:id', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await redis.getAsync(RedisKeys.AppsList + req.params.id);

    if (!list) {
      return res.status(404).json([]);
    }

    return res.status(200).send(list);
  } catch (err) {
    return res.status(500).json({
      code: -1,
      message: err.message
    });
  }
});

AppsRouter.get('/apps/:id/:owner', async(req: Request, res: Response, next: NextFunction) => {
  const { id, owner } = req.params;
  try {
    const list = await redis.getAsync(RedisKeys.AppsList + id);

    if (!list) {
      return res.status(404).json({});
    }

    const app = JSON.parse(list).find((el) => el.owner === owner);

    return res.status(200).json(app);
  } catch (err) {
    return res.status(500).json({
      code: -1,
      message: err.message
    });
  }
});
