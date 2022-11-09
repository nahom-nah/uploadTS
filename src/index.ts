
const dotenv = require('dotenv');
const express  = require('express');
const path = require('path')
import {MikroORM, RequestContext} from "@mikro-orm/core"
import mikroOrmConfig from './mikro-orm.config'
import cors from 'cors'
import {Request,Response} from 'express'
import { deleteFile, getFiles, upload} from './resolvers/fileUpload'
import { EntityManager } from "@mikro-orm/postgresql";
import indexRouter from './routes'
import bodyParser from 'body-parser';
export const DI = {} as {
    // server: http.Server;
    orm: MikroORM,
    em: EntityManager,
  };
const main  = (async () =>{ 

  const app = express();
  app.use(bodyParser.json({limit:'10mb'}))
  app.use(bodyParser.urlencoded({extended:true}))
  dotenv.config()
    DI.orm =await MikroORM.init(mikroOrmConfig)
    ;
    await DI.orm.getMigrator().up()

    app.use(cors({
        origin:'http://localhost:3000',
        credentials:true
    }));


   
  app.use((req:Request, res:Response, next:any) => RequestContext.create(DI.orm.em, next));
   
    app.use('/api', indexRouter)
    

    let port = process.env.EXPRESS_PORT || 9001;
    app.listen(port ,()=>{console.log(`server is up and running on port ${port}`)});
}   )()

  