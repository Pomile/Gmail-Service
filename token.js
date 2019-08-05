import dotenv from 'dotenv';

dotenv.config();
const token = {
  access_token: process.env.GOOGLE_ACCESS_TOKEN, refresh_token: process.env.GOOGLE_REFRESH_TOKEN, scope: process.env.GOOGLE_SCOPE, token_type: 'Bearer', expiry_date: process.env.GOOGLE_EXPIRY,
};


export default token;
