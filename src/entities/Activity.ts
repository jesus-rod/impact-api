import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Field, ObjectType } from 'type-graphql';

// I made this into a class because it is easy to turn into into the right TypeGraphQL type using annotations
@ObjectType()
@Entity()
export class Activity {
  @Field()
  @PrimaryKey()
  id!: number; // string is also supported

  @Field()
  @Property()
  title!: string;

  @Field()
  @Property()
  consumption!: number;

  @Field()
  @Property({ default: 'NOW()' })
  createdAt: Date = new Date();

  @Field()
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
