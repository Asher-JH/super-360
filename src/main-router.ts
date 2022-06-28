import express, { Request, Response } from 'express';
import sgMail from '@sendgrid/mail';
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID!);
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_APPLICATION_CREDENTIALS!,
      private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsById[0];
    await sheet.loadCells('A1:B26');
    const data: GoogleSpreadsheetRow[] = await sheet.getRows({
      limit: 25,
      offset: 0,
    });

    const processedArray = data
      .map((item) => {
        if (item.url !== undefined && String(item.url).length !== 0) {
          return { url: item.url, name: item.name };
        }
        return false;
      })
      .filter((item) => item !== false);

    res.render('index', { projects: processedArray });
  } catch (err) {
    console.log('Fetch past projects error', err);
    res.render('index', { projects: [] });
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
