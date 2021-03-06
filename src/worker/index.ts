import { Explorer } from './explorer';
import { RedisClient, RedisKeys } from '../redis';

const node = 'https://ssn.zillacracy.com/api';
const contract = 'f27a87c0a82f7ddb1daed81904fcbee253d9fc29';

const explorer = new Explorer(node, contract);
const redis = new RedisClient();


async function updateAds() {
  const { list, hash } = await explorer.getAds();
  const previousHash = await redis.getAsync(RedisKeys.AdsHash);

  if (hash !== previousHash) {
    await redis.setAsync(RedisKeys.AdsList, JSON.stringify(list));
    await redis.setAsync(RedisKeys.AdsHash, hash);
  }
}

async function updateApps() {
  const { list, hash } = await explorer.getApps();
  const previousHash = await redis.getAsync(RedisKeys.AppsHash);

  if (hash !== previousHash) {
    await redis.setAsync(RedisKeys.AppsHash, hash);

    const promiseList = Object.keys(list).map((key) => {
      redis.setAsync(String(RedisKeys.AppsList + key), JSON.stringify(list[key]));
    });

    await Promise.all(promiseList);
  }
}

async function updateReserve() {
  const reserve = await explorer.getReserve();

  await redis.setAsync(RedisKeys.Reserve, String(reserve));
}

async function updateblockNumber() {
  const { header } = await explorer.getLatestTxBlock();  
  await redis.setAsync(RedisKeys.BlockNumber, header.BlockNum);


  return Number(header.BlockNum);
}

async function main() {
  console.log(new Date(), 'start');
  const previousBlockNumber = await redis.getAsync(RedisKeys.BlockNumber);
  const currentBlockNumber = await updateblockNumber();

  console.log('previous:', previousBlockNumber, 'current:', currentBlockNumber);

  if (Number(previousBlockNumber) < currentBlockNumber) {
    await updateAds();
    await updateApps();
    await updateReserve();
  }
}

main();

setInterval(async() => {
  await main();
}, 30000);
