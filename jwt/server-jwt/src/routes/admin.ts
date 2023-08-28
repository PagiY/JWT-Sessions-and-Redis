import express, { Request, Response } from 'express';
import { validateToken } from '../middleware/validateToken.js';

const admin = express.Router();

admin.get('/',
  validateToken('admin'),
  (request: Request, response: Response) => {
    console.log(request.body);
    return response
      .status(200)
      .json({msg: 'Admin accessed successfully'});
});

export default admin;
