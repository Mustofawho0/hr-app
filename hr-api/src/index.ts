import express, { Express } from 'express';
import router from './routers/index';
import { Request, Response, NextFunction } from 'express';

const app: Express = express();
const port = 404;
const cors = require('cors');

app.use(cors());
app.use('/api', router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  const statusMessage = err.message || 'Error';

  res.status(statusCode).send({
    error: true,
    message: statusMessage,
    data: null,
  });
});

app.listen(port, () => {
  console.log(
    `🐣🐤🐥[server]: This Server Running at http://localhost:${port}`
  );
});
