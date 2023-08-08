import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const auth = express.Router();

const users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'db.json'), 'utf-8'));

// route to verify access token
auth.get('/', (request: Request, response: Response) => {
  response.send(`Hello ${users}`);
});

auth.post('/login', (request: Request, response: Response) => {
  console.log('/login');

  const { username, password } = request.body;
  
  if (username === '' || password === '') {
    return response.status(400).json({error: 'Username and password must not be blank'});
  }
  
  const user = users.filter((_user: {
    id: number,
    username: string,
    password: string,
    user_type: string
  }) => {
    return _user.username === username;
  })

  if (user.length === 0) {
    return response.status(401).json({error: 'Invalid username or password'});
  }

  const data = {
    user: username,
  };
  
  if(!process.env.ACCESS_TOKEN || !process.env.REFRESH_TOKEN) {
    throw new Error('ACCESS TOKEN or REFRESH TOKEN key must be defined');
  }
  // access token - short-lived token
  const accessT = jwt.sign(
    data,
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "1m", // expiration date
      audience: user[0].user_type, // type
      issuer: 'pasyente',
      subject: "1", // specific user id
    },
  );
  
  const refreshT = jwt.sign(
    data,
    process.env.REFRESH_TOKEN,
    {
      expiresIn: "5m", // expiration date
      audience: user[0].user_type, // type
      issuer: 'pasyente',
      subject: "1", // specific user id
    },
  )

  response
    .cookie('accessToken', accessT, {
      httpOnly: true,
      path: '/',
    })
    .cookie('refreshToken', refreshT, {
      httpOnly: true,
      path: '/',
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

  // if jwt refresh token is not saved to db:
  //  1. get refresh token from request cookie
  const { refreshToken } = request.cookies;
  //  2. verify refresh token
  if (refreshToken) {

    if(!process.env.REFRESH_TOKEN) {
      throw new Error('ACCESS TOKEN or REFRESH TOKEN key must be defined');
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

    } catch (err) {

    }
  }
  //  3. issue new access token if valid refresh token
});

export default auth;