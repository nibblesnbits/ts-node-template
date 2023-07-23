import validateAuth from './validateAuth';
import { Request, Response } from 'express';

describe('validateAuth', () => {
  let req: Request;
  let res: Response;
  let next: jest.Mock;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
    next = jest.fn();
  });

  it('should call next if authorization header is present', async () => {
    req.headers = { authorization: 'Bearer token' };

    await validateAuth(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should return 401 if authorization header is missing', async () => {
    await validateAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Unauthorized');
  });

  it('should return 401 if token is missing', async () => {
    req.headers = { authorization: 'Bearer ' };

    await validateAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Unauthorized');
  });
});
