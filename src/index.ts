import * as path from 'path';
import { ConnectionOptions, createConnection } from 'typeorm';
import { app } from './server';
import entities from './model';

import './pinata';

const PORT = 3000;
const root = path.resolve(__dirname, "..");
const options: ConnectionOptions = {
  entities,
  type: "sqlite",
  synchronize: true,
  database: `${root}/database.sqlite`,
  logging: true
};

export async function main() {
  const connection = await createConnection(options);

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });

  return connection;
}
