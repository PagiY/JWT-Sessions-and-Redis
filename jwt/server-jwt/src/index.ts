import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import auth from './routes/auth.js';
import admin from './routes/admin.js';
import client from './routes/client.js';

const PORT = 8000;

const app: Express = express();

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', auth);
app.use('/api/admin', admin);
app.use('/api/client', client);

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
