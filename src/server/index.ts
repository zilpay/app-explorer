import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router } from './routers';

export const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1/', router);
