import { Request, Response, NextFunction } from "express";
import jwt, { Jwt } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  user: string,
  iat: number,
  exp: number,
  aud: string,
  iss: string,
  sub: string,
}

export const validateToken = (userType: String) => {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      const header = request.headers.authorization;
      if (header) {
        
        if (!process.env.ACCESS_TOKEN) {
          throw new Error ('ACCESS_TOKEN must be defined!');
        }
  
        const accessToken = header.split(' ')[1];
  
        // verification of access token
        jwt.verify(
          accessToken,
          process.env.ACCESS_TOKEN,
          (err, decoded) => {
            if (err) {
              return response.status(401)
                .json({err: 'Invalid token'})
            }
            // if user's user type is not what's requested
            if (decoded && (decoded as JwtPayload).aud !== userType) {
              return response.status(403)
                .json({err: 'Access forbidden'})
            }
            request.body.user = decoded;
            next();
          }
        );
      }
    } catch (err) {
      return response.status(500).json({err: 'Token not provided.'});
    }
  }
}