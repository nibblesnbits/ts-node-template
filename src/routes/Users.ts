import type { Express, Request, Response } from 'express';
import { AppDataSource } from '@/lib/db';
import * as Models from '@/lib/db/Models';

export default function userRoute(app: Express) {
  app.get('/Users', [
    async (_req: Request, res: Response) => {
      try {
        const users = await AppDataSource.manager.find(Models.User);
        return res.json(users);
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          message: (error as Error).message,
        });
      }
    },
  ]);
}
