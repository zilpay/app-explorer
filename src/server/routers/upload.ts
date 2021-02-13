import multer from 'multer';
import express from 'express';

export const uploadRouter = express();
const upload = multer({
  dest: __dirname + '/uploads/images'
});

uploadRouter.post('/upload/poster', upload.single('poster'), (_req, res) => {
  res.status(201).send('User created');
});

uploadRouter.post('/upload/icon', upload.single('icon'), (_req, res) => {
  res.status(201).send('User created');
});
