import axios from 'axios';
import dotenv from 'dotenv';


dotenv.config();
const getAccessToken = async (refreshToken) => {
  try {
    let token;
    const url = `https://www.googleapis.com/oauth2/v4/token?client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&refresh_token=${refreshToken}&grant_type=refresh_token`;
    await axios.post(url).then((result) => {
      token = { ...result.data };
      process.env.GOOGLE_ACCESS_TOKEN = token.access_token;
    });
    return token;
  } catch (err) {
    return { error: err.message };
  }
};

export default getAccessToken;
