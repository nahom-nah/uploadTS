"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Uploads_1 = require("./entities/Uploads");
exports.default = {
    migrations: {
        path: "./src/migrations",
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    dbName: constants_1.DB_NAME,
    entities: [Uploads_1.Uploads],
    password: constants_1.DB_PASSWORD,
    type: "postgresql",
    debug: !constants_1.__PROD__,
};
//# sourceMappingURL=mikro-orm.config.js.map