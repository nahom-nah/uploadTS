import { MikroORM } from "@mikro-orm/core";
import { DB_NAME, DB_PASSWORD, __PROD__ } from "./constants";
import path from 'path'
import {Uploads} from './entities/Uploads'

export default {
  migrations: {
    path: "./src/migrations", // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  dbName: DB_NAME,
  entities: [Uploads],
  password: DB_PASSWORD,
  type: "postgresql",
  debug: !__PROD__,
} as Parameters<typeof MikroORM.init>[0];
