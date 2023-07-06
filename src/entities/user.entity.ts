import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRoles {
  USER = 'user',
  ADMIN = 'admin',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: UserRoles.USER })
  role: string;
}
