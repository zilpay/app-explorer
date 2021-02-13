import express from 'express';
import bodyParser from 'body-parser';

import { router } from './routers';

export const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
