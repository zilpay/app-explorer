import { Zilliqa } from '@zilliqa-js/zilliqa';
import { Advertising } from '../model/advertising';
import netwrok from '../config/netwrok';

const EXPLORER = String(process.env.EXPLORER);
const URL = netwrok[String(process.env.NET)];
const instance = new Zilliqa(URL);

export async function getAdvertisingList(): Promise<Advertising[]> {
  const field = 'ad_list';
  const res = await instance.blockchain.getSmartContractSubState(
    EXPLORER,
    field
  );

  if (res.error) {
    throw res.error;
  }

  const map = res.result[field];
  return Object.keys(map).map((owner) => new Advertising(
    String(owner),
    String(map[owner].arguments[2]),
    String(map[owner].arguments[1]),
    Number(map[owner].arguments[0])
  ));
}
