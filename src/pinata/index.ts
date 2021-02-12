import pinataSDK from '@pinata/sdk';


const IPFS_API_KEY = process.env.IPFS_API_KEY;
const IPFS_API_SECRET = process.env.IPFS_API_SECRET;
const pinata = pinataSDK(IPFS_API_KEY, IPFS_API_SECRET);

pinata
  .testAuthentication()
  .then((result) => {
    //handle successful authentication here
    console.log('pinata authenticated:', result.authenticated);
  }).catch((err) => {
    //handle error here
    console.log('pinata authenticated:', err);
  });
