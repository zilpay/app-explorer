import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class IPFSHash {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  hash!: string;
}
