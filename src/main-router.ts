import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.render('index', {});
});

router.get('/about-us', (_req: Request, res: Response) => {
  res.render('index', {});
});

router.get('/services', (_req: Request, res: Response) => {
  res.render('index', {});
});

router.get('/packages', (_req: Request, res: Response) => {
  res.render('index', {});
});

router.get('/contact', (_req: Request, res: Response) => {
  res.render('index', {});
});

export default router;
