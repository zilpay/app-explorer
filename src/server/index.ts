import express from 'express';
import bodyParser from 'body-parser';

import { router } from './routers';

export const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(router);
