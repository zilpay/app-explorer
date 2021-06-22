import { Connection } from 'typeorm';
import {
  getAdvertisingList,
  getBlockNumber
} from '../zilliqa';
import { Blockchain } from '../model/blockchain';

const NET = String(process.env.NET);

export async function updateBlockchain(cursor: Connection) {
  const currentBlock = await getBlockNumber();
  const repository = cursor.getRepository(Blockchain);
  const found = await repository.findOne({
    name: NET
  });

  if (!found) {
    await repository.save(currentBlock);
  } else {
    currentBlock.id = found.id;
    await repository.save(currentBlock);
  }

  return currentBlock;
}

export async function updateAdvertising(cursor: Connection) {
  const repository = cursor.getRepository(Blockchain);
  const found = await repository.findOne({
    name: NET
  });

  if (!found) {
    throw new Error('blockchain not updated yet.');
  }

  const list = await getAdvertisingList();
  const filtered = list.filter((ad) => ad.block >= found.numTxBlocks);

  console.log(list);

  return filtered;
}
