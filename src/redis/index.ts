import redis from 'redis';
import { promisify } from 'util';

export class RedisClient {
  private _client = redis.createClient();

  public setAsync = promisify(this._client.set).bind(this._client);
  public getAsync = promisify(this._client.get).bind(this._client);
}

export * from './keys';
