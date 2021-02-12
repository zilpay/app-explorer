import * as path from 'path';
import { ConnectionOptions, createConnection } from 'typeorm';
import { app } from './server';

const PORT = 3000;
const root = path.resolve(__dirname, "..")
const options: ConnectionOptions = {
  type: "sqlite",
  database: `${root}/database.sqlite`,
  entities: [],
  logging: true
};

export async function main() {
  const connection = await createConnection(options);

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });

  return connection;
}
