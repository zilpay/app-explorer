import { Zilliqa } from '@zilliqa-js/zilliqa';
import { Blockchain } from '../model/blockchain';
import netwrok from '../config/netwrok';

const NET = String(process.env.NET);
const URL = netwrok[NET];
const instance = new Zilliqa(URL);

export async function getBlockNumber(): Promise<Blockchain> {
  const res = await instance.blockchain.getBlockChainInfo();

  if (res.error) {
    throw res.error;
  }

  return new Blockchain(
    NET,
    res.result.TxBlockRate,
    Number(res.result.NumDSBlocks),
    Number(res.result.NumTxBlocks)
  );
}
