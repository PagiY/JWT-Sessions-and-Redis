import express, { Express, Request, Response } from 'express';

const PORT = 8000;

const app: Express = express();

app.get('/', (request: Request, response: Response) => {
  response.send('hi');
});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
})
