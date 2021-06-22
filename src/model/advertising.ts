import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

@Entity()
export class Advertising {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  owner!: string;

  @Column()
  hash!: string;

  @Column()
  url!: string;

  @Column()
  block!: number;

  constructor(
    owner: string,
    hash: string,
    url: string,
    block: number
  ) {
    this.hash = hash;
    this.url = url;
    this.owner = owner;
    this.block = block;
  }
}
