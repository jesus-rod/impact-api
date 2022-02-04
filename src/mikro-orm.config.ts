import { MikroORM } from '@mikro-orm/core';
import path from 'path';
import { __prod__ } from './constants';
import { Activity } from './entities/Activity';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Activity],
  dbName: 'impact-server',
  type: 'postgresql',
  debug: !__prod__,
  // user: '',
  // password: '',
} as Parameters<typeof MikroORM.init>[0];
