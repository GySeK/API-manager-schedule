import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryColumn()
  login: string;

  @Column()
  password: string;

  @Column()
  isAdmin: boolean;
}