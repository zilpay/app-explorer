import env from 'dotenv';
env.config();

import * as path from 'path';
import { ConnectionOptions, createConnection } from 'typeorm';
import { updateAdvertising, updateBlockchain } from './fetch';
import entities from '../model';

const root = path.resolve(__dirname, "../..");
const options: ConnectionOptions = {
  entities,
  type: "sqlite",
  synchronize: true,
  database: `${root}/database.sqlite`,
  logging: true
};

async function main() {
  const connection = await createConnection(options);

  await updateBlockchain(connection);
  await updateAdvertising(connection);
  await connection.close();
}

main();
