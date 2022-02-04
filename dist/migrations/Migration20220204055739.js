"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220204055739 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220204055739 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "activity" ("id" serial primary key, "title" varchar(255) not null, "consumption" int4 not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    }
}
exports.Migration20220204055739 = Migration20220204055739;
//# sourceMappingURL=Migration20220204055739.js.map