
if (!process.env.EXPLORER) {
  throw new Error('process.env.EXPLORER is undefined set EXPLORER address in .env');
} else if (!process.env.PROVIDER) {
  throw new Error('Node API is undefined set API url in .env');
} else if (!process.env.NET) {
  throw new Error('Blockchain name (NET) is undefined set in .env');
}

export * from './advertising';
export * from './blockchain';
