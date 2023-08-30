import express, { Express } from 'express';
import session from 'express-session';
import RedisStore from 'connect-redis';

import redis from './redisdb.js';
import auth from './routes/auth.js';

const app: Express = express();
const redisStore = new RedisStore({
  client: redis,
})
app.use(express.json());
app.use(
  session({
    store: redisStore,
    secret: 'test',
    saveUninitialized: false,
    resave: false,
    name: 'hello-cookie',
    cookie: {
      secure: false, // set to true if in production to transmit cookies over https only
      httpOnly: true, // prevent client side to view cookies
      maxAge: 1000 * 60 * 30, // 30 minutes cookie max age
      sameSite: 'lax',
    }
  })
);

app.use('/api', auth);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening at PORT ${PORT}`);
})