import pinataSDK from '@pinata/sdk';
import { Stream } from 'stream';

const IPFS_API_KEY = String(process.env.IPFS_API_KEY);
const IPFS_API_SECRET = String(process.env.IPFS_API_SECRET);
const pinata = pinataSDK(IPFS_API_KEY, IPFS_API_SECRET);

pinata
  .testAuthentication()
  .then((result) => {
    //handle successful authentication here
    console.log('pinata authenticated:', result.authenticated);
  }).catch((err) => {
    //handle error here
    console.log('pinata authenticated:', JSON.stringify(err, null, 4));
  });

export async function pinImage(image: Stream) {
  const options: any = {
    pinataOptions: {
        cidVersion: 0
    }
  };
  const result = await pinata.pinFileToIPFS(image, options);

  return result.IpfsHash;
}

export async function pinJson(body: object) {
  const result = await pinata.pinJSONToIPFS(body);

  return result.IpfsHash;
}