import { Router, Request, Response } from 'express';
import fs from 'fs';
const fetch = require('node-fetch');

export const repos = Router();
const JSON_URL = "https://api.github.com/users/silverorange/repos";

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  try {
    let fileData = JSON.parse(fs.readFileSync("data/repos.json", "utf8"));
    res.json(fileData);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }

  // try {
  //   let urlData = await fetch(JSON_URL)
  //   console.log(urlData)
  // } catch (error) {
  //   console.log(error);
  // }
  
});
