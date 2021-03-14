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

  @ManyToOne(() => App, (app) => app.id, {
    nullable: false
  })
  appId!: App;

  constructor(hash: string) {
    this.hash = hash;
  }
}
