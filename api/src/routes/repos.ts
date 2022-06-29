import { Router, Request, Response } from 'express';
import fs from 'fs';
const fetch = require('node-fetch');

export const repos = Router();
const JSON_URL = "https://api.github.com/users/silverorange/repos";

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  res.header("Content-Type", "application/json")

  res.status(200);

  try {
    // read file
    let fileData = JSON.parse(fs.readFileSync("data/repos.json", "utf8"));
    let forkFalseOnly = fileData.filter((repo: any) => {
      return repo['fork'] === false;
    });
    res.json(forkFalseOnly);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }

  // try {
  //   // fetch json from url
  //   let urlData = await fetch(JSON_URL)
  //   console.log(urlData)
  // } catch (error) {
  //   console.log(error);
  // }
  
});
