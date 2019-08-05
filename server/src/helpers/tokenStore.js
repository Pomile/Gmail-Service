const storeToken = (token) => {
  process.env.GOOGLE_ACCESS_TOKEN = token.access_token;
  process.env.GOOGLE_REFRESH_TOKEN = token.refresh_token;
  process.env.GOOGLE_EXPIRY = token.expiry_date;
  process.env.GOOGLE_SCOPE = token.scope;
  process.env.GOOGLE_TOKEN_TYPE = token.token_type;
};

export default storeToken;
