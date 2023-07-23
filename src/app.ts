import express from 'express';
import type { Request, Response } from 'express';
import validateAuth from './middleware/validateAuth';

const app = express();

app.get('/', [
  validateAuth,
  (_: Request, res: Response) => {
    res.send('Hello World!');
  },
]);

app.get('/health', (_: Request, res: Response) => {
  res.status(200).end();
});

export default app;
