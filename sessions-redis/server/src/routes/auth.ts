import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const auth = express.Router();

const users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'db.json'), 'utf-8'));

declare module 'express-session' {
  interface SessionData {
    user_id: number,
    username: string,
  }
};

auth.post('/login', (request: Request, response: Response) => {
  const {username, password} = request.body;

  const user = users.filter((_user: {
    id: number,
    username: string,
    password: string,
    user_type: string
  }) => {
    return _user.username === username && _user.password === password;
  });
  
  if(user.length === 0){
    return response
      .status(401)
      .json({error: 'Invalid username or password'});
  }

  // if credentials are correct, store credentials in session
  request.session.user_id = user.id;
  request.session.username = user[0].username;

  console.log(request.session);
  response
    .status(200)
    .json({msg: 'success'});
});

auth.post('/logout', (request: Request, response: Response) => {
  request.session.destroy((err) => {
    return response.status(500)
  })
});

export default auth;