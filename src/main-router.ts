import express, { Request, Response } from 'express';
// @ts-expect-error // No TS package
import emailSDK from 'sib-api-v3-sdk';

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

router.post('/new-contact', (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  const client = emailSDK.ApiClient.instance;
  const apiKey = client.authentications['api-key'];
  apiKey.apiKey = process.env.EMAIL_API_KEY;

  const apiInstance = new emailSDK.TransactionalEmailApi();
  let sendSmtpEmail = new emailSDK.SendSmtpEmail();

  sendSmtpEmail = {
    to: [
      {
        email: 'asherchan1188@gmail.com',
        name: 'Asher Chan',
      },
    ],
    templateId: 1,
    params: {
      name,
      email,
      message,
    },
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    () => {
      console.log(`API called successfully.`);
    },
    () => {
      console.error('Thers was a problem sending email.');
    }
  );

  res.redirect('/contact');
});

export default router;
