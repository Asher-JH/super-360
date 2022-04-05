import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import path from 'path';

const startServer = async () => {
  const app: Express = express();
  const port = Number(process.env.PORT) || 8080;

  // EJS View Engine
  app.set('views', './views');
  app.set('view engine', 'ejs');

  // Access to public files
  app.use(express.static(path.join(__dirname, '/public')));

  app.get('/', (_req: Request, res: Response) => {
    res.render('/pages/index', {});
  });

  app.listen(port, () => {
    console.log(`🚀 Server started on http://localhost:${port}`);
  });
};

startServer().catch(() => {
  console.log('🚫 Encountered error.');
});
