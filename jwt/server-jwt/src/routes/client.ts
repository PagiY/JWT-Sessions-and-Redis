import express, { Request, Response } from 'express';
import { validateToken } from '../middleware/validateToken.js';

const client = express.Router();

client.get('/',
  validateToken('client'),
  (request: Request, response: Response) => {
    console.log(request.body);
    return response
      .status(200)
      .json({msg: 'Client accessed successfully'});
});

export default client;
