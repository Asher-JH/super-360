import express, { Request, Response } from 'express';
import sgMail from '@sendgrid/mail';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  res.render('index', {});
});

router.get('/about', (_req: Request, res: Response) => {
  res.render('about', {});
});

router.get('/services', (_req: Request, res: Response) => {
  res.render('services', {});
});

router.get('/packages', (_req: Request, res: Response) => {
  res.render('packages', {});
});

router.get('/contact', (_req: Request, res: Response) => {
  res.render('contact', {});
});

router.post('/new-contact', async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'asherchan2002@hotmail.com',
      from: 'asherchan1177@gmail.com',
      subject: 'New contact from Super-360',
      text: `${name} ${email} ${message}`,
      html: '<strong>Woohoo</strong>',
      dynamic_template_data: {
        name,
        email,
        message,
      },
      template_id: 'd-41c96c29b20c4b42845290aff9b715cd',
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
    }
  }

  res.redirect('/contact');
});

export default router;
