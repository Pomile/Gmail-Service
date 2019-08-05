import express from 'express';
import gmail from '../controller/gmail';
// import controllers and helpers and use it in your route handlers
const routes = express.Router();

routes.get(
  '/test',
  (req, res) => {
    res.status(200).json({ status: 200, msg: 'Route module is working perfectly' }).end();
  },
);

routes.get(
  '/oauth2callback',
  gmail.getNewToken,
);

routes.get(
  '/oauth/url',
  gmail.generateOAuthUrl,
);

routes.post(
  '/gmail/send',
  gmail.send,
);

routes.post(
  '/nodemailer/send',
  gmail.sendWithNodeMailer,
);


export default routes;
