import { google } from 'googleapis';
import open from 'open';
import dotenv from 'dotenv';
import { Base64 } from 'js-base64';
import nodemailer from 'nodemailer';
import axios from 'axios';
import '@babel/polyfill';
import googleCred from '../gService';
import generateNewToken from '../helpers/generateToken';
import buildMessage from '../helpers/sendMessage';
import getAccessToken from '../helpers/getAccess';

dotenv.config();

const {
  clientId, redirectUris,
} = googleCred;
const redirectUrl = redirectUris[0];
const clientSecret = 'tqbzFhBh-luLpFhikY72q_xi';

const oAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUrl,
);

class Gmail {
  static async generateOAuthUrl(req, res) {
    const scopes = ['https://www.googleapis.com/auth/gmail.send'];
    const url = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent',
    });

    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
      await open(url);
    }
    res.status(200).json({ status: 200, url }).end();
  }

  static async getNewToken(req, res) {
    const { code } = req.query;
    if (code === undefined || code === 'null' || code === '') {
      res.status(400).json({ status: 400, msg: 'authorization code is not defined' }).end();
    } else {
      await generateNewToken(code, res, true);
    }
  }

  static async send(req, res) {
    const auth = await getAccessToken(process.env.GOOGLE_REFRESH_TOKEN);
    if (!auth.error) {
      oAuth2Client.setCredentials(auth);
      const to = 'soft-sky@live.co.uk';
      const from = 'ogedengbe123@gmail.com';
      const subject = 'Testing Mail service';
      const message = '<h1>Wow it works!!!</h1>';
      const email = buildMessage(from, to, subject, message);
      const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
      const base64EncodedEmail = Base64.encodeURI(email);
      await gmail.users.messages.send({
        userId: 'me',
        resource: {
          raw: base64EncodedEmail,
        },
      }, (err, result) => {
        if (err) {
          res.status(500).json({ status: 500, error: 'Oops something went wrong', sent: false }).end();
        } else {
          res.status(200).json({ ...result.data, status: 200, sent: true }).end();
        }
      });
    } else {
      res.status(443).json({ status: 443, error: auth.error });
    }
  }

  static async sendWithNodeMailer(req, res) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.GMAIL_ADDRESS, // generated ethereal user
        pass: process.env.GMAIL_PASS, // generated ethereal password
      },
    });

    // send mail with defined transport object
    transporter.sendMail({
      from: `"Fred Foo 👻" ${process.env.GMAIL_ADDRESS}`, // sender address
      to: 'ogedengbe123@gmail.com, soft-sky@live.co.uk', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    }, (error, response) => {
      if (error) {
        return res.status(500).json({ msg: 'Ooops something went wrong' });
      }
      return res.status(200).json({ ...response, sent: true });
    });
  }
}

export default Gmail;
