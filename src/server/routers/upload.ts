import multer from 'multer';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { pinImage } from '../../pinata';

export const uploadRouter = express();

const MAX_SIZE = 52428800;
const upload = multer({
  dest: path.resolve(__dirname, '../', '../', '../', 'uploads')
});

uploadRouter.post('/upload/poster', upload.single('poster'), async(req, res) => {
  if (!req.file) {
    return res.status(422).json({
      error: 'File needs to be provided.',
      code: -1
    });
  }

  const mime = req.file.mimetype;

  if (mime.split('/')[0] !== 'image') {
    await fs.promises.unlink(req.file.path);

    return res.status(422).json({
      error: 'File needs to be an image.',
      code: -2
    });
  }

  const fileSize = req.file.size;

  if (fileSize > MAX_SIZE) {
    fs.unlinkSync(req.file.path);

    return res.status(422).json({
      error: `Image needs to be smaller than ${MAX_SIZE} bytes.`,
      code: -3
    });
  }

  try {
    const readableStreamForFile = fs.createReadStream(req.file.path);
    const hash = await pinImage(readableStreamForFile);
    
    await fs.promises.unlink(req.file.path);

    return res.status(201).send({
      hash
    });
  } catch (err) {
    return res.status(422).json({
      error: err.message
    });
  }
});

uploadRouter.post('/upload/icon', upload.single('icon'), (_req, res) => {
  res.status(201).send('User created');
});
