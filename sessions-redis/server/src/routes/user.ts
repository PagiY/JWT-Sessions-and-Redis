import express, { Request, Response } from 'express';
import { validateSession } from '../middlewares/validateSession.js';

const user = express.Router();

user.get('/user',
validateSession,
(request: Request, response: Response) => {
  return response.json(request.session);
});

export default user;