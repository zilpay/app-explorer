import express, { Request, Response } from 'express';

export const appInfo = express();

appInfo.post('/app/add', (req: Request, res: Response) => {
  res.status(201).send('User created');
});
