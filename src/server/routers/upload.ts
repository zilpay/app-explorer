import multer from 'multer';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { pinImage } from '../../pinata';

export const uploadRouter = express();

const MAX_SIZE = 52428800;
const upload = multer({
  dest: path.resolve(__dirname, '../', '../', '../', 'uploads'),
  limits: {
    fieldSize: 1024 * 512,
    fieldNameSize: 200
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'should be PNG'));
    }
  }
});

async function uploadMiddleware(req: Request, res: Response, next: NextFunction) {
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
    await fs.promises.unlink(req.file.path);

    return res.status(422).json({
      error: `Image needs to be smaller than ${MAX_SIZE} bytes.`,
      code: -3
    });
  }

  return next();
}

uploadRouter.post('/upload/img',
  upload.single('img'),
  uploadMiddleware,
  async (req: Request, res: Response) => {

  try {
    const readableStreamForFile = fs.createReadStream(req.file.path);
    const hash = await pinImage(readableStreamForFile);

    await fs.promises.unlink(req.file.path);

    return res.status(201).json({
      hash
    });
  } catch (err) {
    return res.status(422).json({
      error: err.message
    });
  }
});
