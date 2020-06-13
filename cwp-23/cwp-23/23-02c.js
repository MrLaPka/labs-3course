const http = require('http');
const fs = require('fs');
const axios = require('axios');
const { ClientVerify } = require('./23-02m');

const getResource = async () => {
  const res = await axios.get('http://localhost:8000/resource', { responseType: 'stream' });
  const file = fs.createWriteStream('./txt/out2.txt');
  res.data.pipe(file);
};

const validateSignature = async () => {
  const res = await axios.get('http://localhost:8000/');
  const signatureContext = res.data;
  const signatureVerification = new ClientVerify(signatureContext);
  const rs = fs.createReadStream('./txt/out2.txt');
  signatureVerification.verify(rs, (result) => {
    console.log('Signature verification result:', result);
  });
};

(async () => {
  try {
    await getResource();
    await validateSignature();
  } catch (e) {
    console.error('An error occurred:', e);
  }
})();
