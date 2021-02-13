import multer from 'multer';
import express from 'express';
import path from 'path';

export const uploadRouter = express();
const upload = multer({
  dest: path.resolve(__dirname, '../', '../', '../', 'uploads')
});

uploadRouter.post('/upload/poster', upload.single('poster'), (_req, res) => {
  res.status(201).send('User created');
});

uploadRouter.post('/upload/icon', upload.single('icon'), (_req, res) => {
  res.status(201).send('User created');
});
