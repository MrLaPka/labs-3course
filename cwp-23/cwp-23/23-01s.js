const { ServerDH } = require('./23-01m2');
const fs = require('fs');
const express = require('express');
const cipherFile = require('./23-01m').cipherFile;

let serverSecret;
const serverDH = new ServerDH(1024, 3);

const app = express();
app.set('port', 8000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.json(serverDH.getContext());
});

app.post('/key', (req, res, next) => {
  const clientContext = req.body;
  if (!clientContext.key_hex) {
    res.statusCode = 409;
    res.end('Failure');
  }

  serverSecret = serverDH.getSecret(clientContext);
  console.log('serverSecret:', serverSecret);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  const key = new Buffer(32);
  serverSecret.copy(key, 0, 0, 32);

  const rs = fs.createReadStream('./txt/in.txt');
  const ws = fs.createWriteStream('./txt/ch.txt');
  cipherFile(rs, ws, key);
  res.end('Success');
});

app.get('/resource', (req, res, next) => {
  if (!serverSecret) {
    res.statusCode = 409;
    res.end('Set key');
  }

  res.statusCode = 200;
  const readStream = fs.createReadStream('./txt/ch.txt');
  readStream.pipe(res);
  readStream.on('close', () => {
    console.log(readStream.bytesRead);
    res.end();
  });
});

app.listen(8000, () => {
  console.log('Server is listening: 8000');
});
