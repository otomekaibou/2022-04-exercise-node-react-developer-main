import { Router, Request, Response } from 'express';
import fs from 'fs';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  let fileData = JSON.parse(fs.readFileSync("data/repos.json", "utf8"))

  try {
    let fileData = JSON.parse(fs.readFileSync("data/repos.json", "utf8"))
    res.json(fileData);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
