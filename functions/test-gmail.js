import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config(); // Loads your .env file

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

async function testToken() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    console.log("✅ Access token retrieved:", accessToken.token);
  } catch (err) {
    console.error("❌ Token refresh failed:", err);
  }
}

testToken();
