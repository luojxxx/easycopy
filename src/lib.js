require("dotenv").config();
import crypto from "crypto";
import CryptoJS from "crypto-js";

export const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const generateRandomString = (length) => {
  return crypto.randomBytes(9999).toString("hex").slice(0, length);
};

export const encryptString = (str) => {
  return CryptoJS.AES.encrypt(str, process.env.ENCRYPTION_KEY).toString();
}

export const decryptString = (str) => {
  const byteContent = CryptoJS.AES.decrypt(str, process.env.ENCRYPTION_KEY);
  return byteContent.toString(CryptoJS.enc.Utf8);
}

export const hashString = (str) => {
  return CryptoJS.SHA256(str+process.env.SALT).toString();
};