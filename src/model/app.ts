import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { IPFSHash } from './ipfs';

@Entity()
export class App {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  domain!: string;

  @OneToMany((type) => IPFSHash, (ipfs) => ipfs.id)
  ipfs!: IPFSHash[];

  constructor(name: string, domain: string) {
    this.name = name;
    this.domain = domain;
  }
}
