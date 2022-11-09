// import { Ctx } from "type-graphql";
const fs = require("fs");
const fsPromises = fs.promises;
const mime = require("mime");
const uuid = require("uuid");
import { UseRequestContext } from '@mikro-orm/core';
import { MikroORM } from '@mikro-orm/postgresql';
import { Request, Response } from 'express'
import express = require('express')
import { Uploads } from './../entities/Uploads'
import { DI } from '../index';
 

 
export const upload = async (req:Request, res:Response) =>{
  console.log(req.file);
  res.send("hello")

  let filename = req.file?.filename;
  let size = req.file?.size;
  const filepath = req.file?.path;
    try{
     let file =  DI.orm.em.create(Uploads,{path:filepath, name:filename, size, createdAt: new Date()})
     try {
      await DI.orm.em.persistAndFlush(file)

      res.status(200).json({
        status:"success",
        message: "successfully uploaded"
      })
  } catch (err) {

    console.log('upload error');
  }
    }catch(err){
      console.log(err)
    }
}

export const getFiles = async (req:Request, res:Response) =>{

  try{
     let files = await DI.orm.em.find(Uploads,{});
      
     res.status(200).json({
      status:'success',
      files
     })
  }catch(err){
    console.log(err)
  }
}

export const deleteFile = async (req:Request, res:Response) =>{

  let id:number = parseInt(req.body.id)
  try{
     const file = DI.orm.em.findOne(Uploads,{id});
     DI.orm.em.remove(file);
    res.status(200).json({
     status:'success',
     
    })
 }catch(err){
   console.log(err)
 }
}