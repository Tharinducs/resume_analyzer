import bcrypt from "bcrypt";
import { isBoolean } from "../lib/custom.lodash.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const validatePassword = async (inputPassword, storedHashedPassword) => {
  return await bcrypt.compare(inputPassword, storedHashedPassword);
};

export const isStrictTrue = (val) => isBoolean(val) && val === true;

export const verifyProviderLogin = async (token) => {
  if (!token) {
    throw new Error("No token provided");
  }
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  return payload;
}

export const getAIProviderKey = (providerType) => {
  switch (providerType) {
    case "gemini":
      return process.env.GEMINI_API_KEY;
    case "groq":
      return process.env.GROQ_API_KEY;
    default:
      throw new Error(`Unsupported AI provider: ${providerType}`);
  }
}