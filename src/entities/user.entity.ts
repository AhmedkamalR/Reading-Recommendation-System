import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRoles {
  USER = 'user',
  ADMIN = 'admin',
}
@Entity()
export class User {
  save() {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: UserRoles.USER })
  role: string;
}
