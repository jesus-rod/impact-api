import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// I made this into a class because it is easy to turn into into the right TypeGraphQL type using annotations
// Also to extend from BaseEntity, then we can use .find() and .findOne(), etc
@ObjectType()
@Entity()
export class Activity extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number; // string is also supported

  @Field(() => String)
  @Column()
  title!: string;

  @Field()
  @Column()
  consumption!: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
