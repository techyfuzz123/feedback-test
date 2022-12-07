// crypto module
const crypto = require("crypto");
require("dotenv").config();
const algorithm = "aes-256-cbc";
const Securitykey = process.env.DECIPHER_KEY;
const initVector = process.env.INIT_DECIPHER_KEY;

const enCrypt = (data) => {
  // protected data
  const message = JSON.stringify(data);

  // the cipher function
  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

  // encrypt the message
  // input encoding
  // output encoding
  let encryptedData = cipher.update(message, "utf-8", "hex");

  encryptedData += cipher.final("hex");

  return encryptedData;
};

const deCrypt = (encryptedData) => {
  // the decipher function
  const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

  let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

  decryptedData += decipher.final("utf-8");

  return decryptedData;
};

module.exports = {
  enCrypt,
  deCrypt,
};
