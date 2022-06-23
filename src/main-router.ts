import express, { Request, Response } from 'express';
import sgMail from '@sendgrid/mail';
import { google } from 'googleapis';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  const auth = new google.auth.GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/spreadsheet',
  });

  const authClientObject = await auth.getClient();

  const service = google.sheets({ version: 'v4', auth: authClientObject });

  try {
    const result = await service.spreadsheets.values.get({
      spreadsheetId: '1Rg4Ptf08zfkmG3bC3JQ5at8Jh2oRVTM4xX_31xJ0WGc',
      range: 'A:A',
      key: 'AIzaSyBUF8Pcwvpnl_8z1N7mYhh3pJk4JZBRY6U',
    });
    const data = result.data.values ? result.data.values.length : 0;

    console.log(data);
    res.render('index', { projects: [] });
  } catch (err) {
    console.log('Fetch past projects error', err);
    res.render('index', {
      // Example
      projects: [
        {
          url: 'https://kuula.co/share/collection/7qB8R?logo=-1&card=1&info=0&fs=2&vr=2&sd=2&initload=4&autopalt=6&thumbs=1',
          name: 'hello',
        },
      ],
    });
  }
});

router.get('/about', (_req: Request, res: Response) => {
  res.render('about', {});
});

router.get('/services', (_req: Request, res: Response) => {
  res.render('services', {});
});

// Not used anymore
// router.get('/packages', (_req: Request, res: Response) => {
//   res.render('packages', {});
// });

router.get('/features', (_req: Request, res: Response) => {
  res.render('features', {});
});

router.get('/contact', (_req: Request, res: Response) => {
  res.render('contact', {});
});

router.post('/new-contact', async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: process.env.SEND_TO_EMAIL,
      from: 'techbytes-solutions@engineer.com',
      subject: 'New contact from Super-360',
      text: `${name} ${email} ${message}`,
      html: '<strong>Woohoo</strong>',
      dynamic_template_data: {
        name,
        email,
        message,
      },
      template_id: process.env.TEMPLATE_ID,
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
