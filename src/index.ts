import { ARRAY_OPERATORS, MikroORM } from '@mikro-orm/core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { __prod__ } from './constants';
import { Activity } from './entities/Activity';
import mikroConfig from './mikro-orm.config';
import { ActivityResolver } from './resolvers/activity';
import { HelloResolver } from './resolvers/hello';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);

  orm.getMigrator().up();
  // const activity = orm.em.create(Activity, {
  //     title: 'travelled somewhere',
  //     consumption: 5,
  // });
  // await orm.em.persistAndFlush(activity);

  const activities = await orm.em.find(Activity, {});
  console.log(activities);

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, ActivityResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log('Server listening on port 4000');
  });
};

main().catch((err) => {
  console.error('Oh no something went wrong:', err);
});

console.log('testing node');
