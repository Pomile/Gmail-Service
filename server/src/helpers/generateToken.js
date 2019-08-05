import { google } from 'googleapis';
import googleCred from '../gService';
import storeToken from './tokenStore';

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

const generateNewToken = async (code, res, sendResponse) => oAuth2Client.getToken(code, (err, token) => {
  if (err) {
    res.status(401).json({ status: 401, msg: err.message }).end();
  } else {
    oAuth2Client.setCredentials(token);
    // Store the token to env
    storeToken(token);
    if (sendResponse) {
      res.status(200).json({ token, success: true }).end();
    } else {
      res.redirect('http://localhost:8000/api/v1/gmail/send');
    }
  }
});

export default generateNewToken;
