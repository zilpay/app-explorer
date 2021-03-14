import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import { App } from './app';

@Entity()
export class IPFSHash {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  hash!: string;

  @ManyToOne((type) => App, (app) => app.id)
  appId!: App;

  constructor(hash: string) {
    this.hash = hash;
  }
}
