import fetch from 'cross-fetch';
import { Methods } from './methods';

export type Params = string[] | number[] | (string | string[] | number[])[];

export class Zilliqa {

  private _node: string;

  constructor(node: string) {
    this._node = node;
  }

  public async getSmartContractSubState(
    contract: string,
    field: string,
    params: string[] | number[] = []
  ) {
    const request = this._json(
      Methods.GetSmartContractSubState,
      [contract, field, params]
    );
    const responce = await fetch(this._node, request);

    if (responce.status !== 200) {
      throw new Error('Error node');
    }

    const data = await responce.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.result;
  }

  private _json(method: string, params: Params) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        method,
        params,
        id: 1,
        jsonrpc: '2.0'
      })
    };
  }
}