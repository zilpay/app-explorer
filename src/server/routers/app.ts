import express from 'express';

export const appInfo = express();

appInfo.post('/create/app', (_req, res) => {
  res.status(201).send('User created');
});
