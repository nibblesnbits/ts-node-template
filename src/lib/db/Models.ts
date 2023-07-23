import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'User', schema: 'public' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
