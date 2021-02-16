import pinataSDK from '@pinata/sdk';
import { Stream } from 'stream';


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

export async function pinImage(domain: string, image: Stream) {
  const options = {
    pinataMetadata: {
        name: domain
    },
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
