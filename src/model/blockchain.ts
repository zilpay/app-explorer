import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

@Entity()
export class Blockchain {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  txBlockRate!: number;

  @Column()
  numDSBlocks!: number;

  @Column()
  numTxBlocks!: number;

  constructor(
    name: string,
    txBlockRate: number,
    numDSBlocks: number,
    numTxBlocks: number
  ) {
    this.name = name;
    this.txBlockRate = txBlockRate;
    this.numDSBlocks = numDSBlocks;
    this.numTxBlocks = numTxBlocks;
  }
}
