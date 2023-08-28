import express, { Request, Response } from 'express';
import jwt, { JsonWebTokenError, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
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
auth.post('/', (request: Request, response: Response) => {
  const { accessToken, refreshToken } = request.cookies;

  if (accessToken && refreshToken) {
    
    if(!process.env.ACCESS_TOKEN || !process.env.REFRESH_TOKEN) {
      throw new Error('ACCESS TOKEN or REFRESH TOKEN key must be defined');
    }

    try {
      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN,
        (err: any, decoded: any) => {
          if (err) {
            // does not return access token
            // causing the client-side context store to be undefined
            return response.status(401).json(err);
          } else {
            // returns the access token if valid token,
            // the client stores the access token in context
            return response.status(200).json({accessToken});
          }
      });

    } catch (err) {
      return response.status(500).json({error: 'Server error. Could not get token.'})
    }
  } else {
    return response.status(500).json({error: 'No token found.'})
  }
});

auth.post('/register', (request: Request, response: Response) => {
  const { username, password, user_type } = request.body;

  const existingUser = users.find((user: {
    id: string | number,
    username: string,
    password: string,
    user_type: string,
  }) => {
    return user.username === username;
  });

  if (existingUser) {
    return response
      .status(409)
      .json({ error: 'Username exists' });
  }

  const user = {
    id: users.length + 1,
    username: username,
    password: password,
    user_type: user_type,
  };

  users.push(user);

  const data = JSON.stringify(users);

  fs.writeFileSync(path.join(__dirname, '..', 'db.json'), data);

  return response
    .status(200)
    .json({ msg: 'User successfully registered' });
});

auth.post('/login', (request: Request, response: Response) => {

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
    return _user.username === username && _user.password === password;
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
      expiresIn: "1 minute", // expiration date
      audience: user[0].user_type, // type
      issuer: 'pasyente',
      subject: String(user.id), // specific user id
      algorithm: 'HS256',
    },
  );
  
  const refreshT = jwt.sign(
    data,
    process.env.REFRESH_TOKEN,
    {
      expiresIn: "5 minutes", // expiration date
      audience: user[0].user_type, // type
      issuer: 'pasyente',
      subject: String(user.id), // specific user id
      algorithm: 'HS256',
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

auth.post('/logout', (request: Request, response: Response) => {
  const { refreshToken, accessToken } = request.cookies;

  if (refreshToken && accessToken) {
    
    if(!process.env.ACCESS_TOKEN || !process.env.REFRESH_TOKEN) {
      throw new Error('ACCESS TOKEN or REFRESH TOKEN key must be defined');
    }

    try {
      
      response
      .cookie('accessToken', '', {
        httpOnly: true,
        path: '/',
      })
      .cookie('refreshToken', '', {
        httpOnly: true,
        path: '/',
      })
      .json({msg: 'Logged out.'});
    } catch (err) {
      return response.status(500).json({error: 'Server error. Failed to logout.'});
    }

  }
});
// route to request for new access tokens as long as the
// refresh token is not yet expired
auth.post('/refresh', (request: Request, response: Response) => {
  console.log('/refresh');
  // if jwt refresh token is saved to db:
  //  1. get user info
  //  2. get refresh token from db
  //  3. decrypt if encrypted
  //  4. verify refresh token
  //  5. issue new access token if valid refresh token
  // ==========================================================

  // if jwt refresh token is not saved to db:
  //  1. get refresh token from request cookie
  const { refreshToken } = request.cookies;

  //  2. verify refresh token
  if (refreshToken) {
    if(!process.env.ACCESS_TOKEN || !process.env.REFRESH_TOKEN) {
      throw new Error('ACCESS TOKEN or REFRESH TOKEN key must be defined');
    }

    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN) as JwtPayload;
      //  3. issue new access token if valid refresh token
      const data = {
        user: decoded.user,
      };
      // access token - short-lived token
      const accessT = jwt.sign(
        data,
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "1 minute", // expiration date
          audience: decoded.aud, // type
          issuer: decoded.iss,
          subject: decoded.sub, // specific user id
          algorithm: 'HS256',
        },
      );

      response
      .cookie('accessToken', accessT, {
        httpOnly: true,
        path: '/',
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/',
      })
      .json({accessToken: accessT});
    } catch (err) {
      return response.status(500).json({error: 'Server error. Failed to refresh tokens.'});
    }
  } else {
    return response.status(500).json({error: 'No refresh token found.'});
  }
});

export default auth;