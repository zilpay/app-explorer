import { app } from './server';

// import './pinata';

const PORT = 5000;

export async function main() {
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });
}
