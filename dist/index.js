"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const Activity_1 = require("./entities/Activity");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const activity_1 = require("./resolvers/activity");
const hello_1 = require("./resolvers/hello");
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    orm.getMigrator().up();
    const activities = await orm.em.find(Activity_1.Activity, {});
    console.log(activities);
    const app = (0, express_1.default)();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.HelloResolver, activity_1.ActivityResolver],
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
//# sourceMappingURL=index.js.map