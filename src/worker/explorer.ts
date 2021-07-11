import { sha256 } from 'js-sha256';
import { Zilliqa } from './base-zilliqa';

export class Explorer extends Zilliqa {
  private _contract: string;
  private _app = 'app_list';
  private _ad = 'ad_list';
  private _reserve = 'reserve';

  constructor(node: string, address: string) {
    super(node);

    this._contract = address;
  }

  public async getApps() {
    const res = await this.getSmartContractSubState(
      this._contract,
      this._app
    );
    const list = {};

    for (let index = 0; index < Array(6).fill(null).length; index++) {
      if (!res[this._app][index]) {
        list[index] = [];

        continue;
      }


      list[index] = Object.keys(res[this._app][index]).map((key: string) => ({
        owner: key,
        title: res[this._app][index][key].arguments[0],
        description: res[this._app][index][key].arguments[1],
        url: res[this._app][index][key].arguments[2],
        images: res[this._app][index][key].arguments[3],
        icon: res[this._app][index][key].arguments[4],
        category: res[this._app][index][key].arguments[5]
      }));
    }

    return {
      list,
      hash: sha256(JSON.stringify(res[this._app]))
    };
  }

  public async getAds() {
    const res = await this.getSmartContractSubState(
      this._contract,
      this._ad
    );
    return {
      hash: sha256(JSON.stringify(res[this._ad])),
      list: res[this._ad].map((el) => ({
        end: el.arguments[1],
        url: el.arguments[2],
        hash: el.arguments[3]
      }))
    };
  }

  public async getReserve(): Promise<Number> {
    const res = await this.getSmartContractSubState(
      this._contract,
      this._reserve
    );

    return Number(res[this._reserve]);
  }
}
