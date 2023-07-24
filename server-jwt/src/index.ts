import express, { Express, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { validateToken } from './middleware/validateToken.js';

dotenv.config()

const PORT = 8000;

const app: Express = express();

const auth = express.Router();

app.use(express.json());
app.use('/api', auth);

auth.get('/', (request: Request, response: Response) => {
  response.send(`Hello ${process.env.NAME}`);
});

auth.post('/login', (request: Request, response: Response) => {
  const { username, password } = request.body;

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
      expiresIn: "1 day", // expiration date
      audience: 'physicians', // type
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

auth.get('/physicians',
validateToken('physicians'),
(request: Request, response: Response) => {
  console.log(request.body);
  return response
    .status(200)
    .json({msg: 'success'});
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
})
