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
  
  const refreshT = jwt.sign(
    data,
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "1 day", // expiration date
      audience: user_type, // type
      issuer: 'pasyente',
      subject: "1", // specific user id
    },
  )

  response
    .cookie('accessToken', accessT, {
      httpOnly: true,
    })
    .cookie('refreshToken', refreshT, {
      httpOnly: true,
    })
    .json({accessToken: accessT});

});

// route to request for new access tokens as long as the
// refresh token is not yet expired
auth.post('/refresh', (request: Request, response: Response) => {
  // if jwt refresh token is saved to db:
  //  1. get user info
  //  2. get refresh token from db
  //  3. decrypt if encrypted
  //  4. verify refresh token
  //  5. issue new access token if valid refresh token
});

export default auth;