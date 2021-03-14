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

  @Column()
  owner!: string;

  @Column()
  description!: string;

  @Column({ unique: true })
  domain!: string;

  @OneToMany(() => IPFSHash, (ipfs) => ipfs.id, {
    nullable: false
  })
  ipfs!: IPFSHash[];

  constructor(
    owner: string,
    name: string,
    description: string,
    domain: string
  ) {
    this.name = name;
    this.domain = domain;
    this.owner = owner;
    this.description = description;
  }
}
