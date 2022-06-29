import { Router, Request, Response } from 'express';
import fs from 'fs';
const fetch = require('node-fetch');

export const repos = Router();
const JSON_URL = "https://api.github.com/users/silverorange/repos";

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  res.header("Content-Type", "application/json")

  res.status(200);

  let fileData: Array<object>;
  try {
    // read file
    fileData = JSON.parse(fs.readFileSync("data/repos.json", "utf8"));
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }

  let urlData;
  try {
    // fetch json from url
    fetch(JSON_URL)
    .then((res: any) => res.json())
    .then((json: any) => {
      urlData = json;

      let combinedData = fileData.concat(urlData);
      let forkFalseOnly = combinedData.filter((repo: any) => {
        return repo['fork'] === false;
      });
      res.json(forkFalseOnly);
    })
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
