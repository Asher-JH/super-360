import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import path from 'path';

import mainRouter from './main-router';

const startServer = async () => {
  const app: Express = express();
  const port = Number(process.env.PORT) || 8080;

  // EJS View Engine
  app.set('views', `${__dirname}/views/pages`);
  app.set('view engine', 'ejs');

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Access to public files
  app.use(express.static(path.join(__dirname, '/public')));

  // Main Pages
  app.use('/', mainRouter);

  app.use('*', (_req: Request, res: Response) => {
    res.render('not-found', {});
  });

  app.listen(port, () => {
    console.log(`🚀 Server started on http://localhost:${port}`);
  });
};

startServer().catch(() => {
  console.log('🚫 Encountered error.');
});
