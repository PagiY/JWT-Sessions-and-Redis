import express, { Express } from 'express';

const app: Express = express();
app.use(express.json());

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening at PORT ${PORT}`);
})