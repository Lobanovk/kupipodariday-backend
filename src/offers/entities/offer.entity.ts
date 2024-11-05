import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Length } from 'class-validator';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO - связи
  //user
  //item
}
