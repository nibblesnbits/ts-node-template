import userRoute from './Users';
import { Express } from 'express';
import request from 'supertest';
import { AppDataSource } from '@/lib/db';
import * as Models from '@/lib/db/Models';

describe('userRoute', () => {
  let app: Express;

  beforeAll(() => {
    app = require('express')();
    userRoute(app);
  });

  it('should return all users', async () => {
    const users = [
      { name: 'John Doe', id: 1 },
      { name: 'Jane Doe', id:2},
    ];
    await AppDataSource.manager.save(Models.User, users);

    const res = await request(app).get('/Users');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(users);
  });

  it('should return 500 if there is an error', async () => {
    jest.spyOn(AppDataSource.manager, 'find').mockRejectedValueOnce(new Error('Database error'));

    const res = await request(app).get('/Users');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ message: 'Database error' });
  });
});
