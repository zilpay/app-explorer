import * as path from 'path';
import { ConnectionOptions, createConnection } from 'typeorm';

const root = path.resolve(__dirname, "..")
const options: ConnectionOptions = {
  type: "sqlite",
  database: `${root}/database.sqlite`,
  entities: [],
  logging: true
};

export async function main() {
  const connection = await createConnection(options);

  return connection;
}
