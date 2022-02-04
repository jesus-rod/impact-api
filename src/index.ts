import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { Activity } from './entities/Activity';
import { ActivityResolver } from './resolvers/activity';
import { HelloResolver } from './resolvers/hello';
// import path from 'path';

const main = async () => {
  // const connection =
  await createConnection({
    type: 'postgres',
    database: 'impact-server',
    username: 'postgres',
    password: 'postgres',
    logging: true,
    synchronize: true,
    // migrations: [path.join(__dirname, './migrations/*')],
    entities: [Activity],
  });

  // await connection.runMigrations();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, ActivityResolver],
      validate: false,
    }),
    context: () => ({}),
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
