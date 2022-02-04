"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
const Activity_1 = require("./entities/Activity");
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Activity_1.Activity],
    dbName: 'impact-server',
    type: 'postgresql',
    debug: !constants_1.__prod__,
};
//# sourceMappingURL=mikro-orm.config.js.map