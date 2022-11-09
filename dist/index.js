"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DI = void 0;
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const body_parser_1 = __importDefault(require("body-parser"));
exports.DI = {};
const main = (() => __awaiter(void 0, void 0, void 0, function* () {
    const app = express();
    app.use(body_parser_1.default.json({ limit: '10mb' }));
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    dotenv.config();
    exports.DI.orm = yield core_1.MikroORM.init(mikro_orm_config_1.default);
    yield exports.DI.orm.getMigrator().up();
    app.use((0, cors_1.default)({
        origin: 'http://localhost:3000',
        credentials: true
    }));
    app.use((req, res, next) => core_1.RequestContext.create(exports.DI.orm.em, next));
    app.use('/api', routes_1.default);
    let port = process.env.EXPRESS_PORT || 9001;
    app.listen(port, () => { console.log(`server is up and running on port ${port}`); });
}))();
//# sourceMappingURL=index.js.map