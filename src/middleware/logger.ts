import fs  from 'fs';
import type { NextFunction, Request, Response } from "express";


const logger=(req:Request, res:Response, next:NextFunction) => {
 console.log('Method-Url-Time:', req.method, req.url, Date.now());
const log = `\nMethod -> ${req.method} URL -> ${req.url} Time -> ${Date.now()}\n`;
 fs.appendFile("logger.txt",log,(err)=>{
 })
  next()
}

export default logger;


