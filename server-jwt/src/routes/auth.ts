import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = express.Router();

auth.get('/', (request: Request, response: Response) => {
  response.send(`Hello ${process.env.NAME}`);
});

auth.post('/login', (request: Request, response: Response) => {
  const { username, password, user_type } = request.body;

  const data = {
    user: username,
  };
  
  if(!process.env.ACCESS_TOKEN) {
    throw new Error('ACCESS TOKEN key must be defined');
  }

  // access token - short-lived token
  const accessT = jwt.sign(
    data,
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "5 minutes", // expiration date
      audience: user_type, // type
      issuer: 'pasyente',
      subject: "1", // specific user id
    },
  );
  
  response
    .cookie('accessToken', accessT, {
      httpOnly: true,
    })
    .json({accessToken: accessT});

});

export default auth;