import { Migration } from '@mikro-orm/migrations';

export class Migration20220204055739 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "activity" ("id" serial primary key, "title" varchar(255) not null, "consumption" int4 not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
  }

}
