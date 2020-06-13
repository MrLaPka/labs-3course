const { ServerSign } = require('./23-02m');
const fs = require('fs');
const app = require('express')();

app.set('port', 8000);

app.get('/resource', (req, res, next) => {
  res.statusCode = 200;
  const readStream = fs.createReadStream('./txt/in.txt');
  readStream.pipe(res);
  readStream.on('close', () => {
    console.log(readStream.bytesRead);
    res.end();
  });
});

app.get('/', (req, res, next) => {
  let serverSign = new ServerSign();
  let readStream = fs.createReadStream('./txt/in.txt');

  serverSign.getSignContext(readStream, (signContext) => {
    res.json(signContext);
  });
});

app.listen(8000, () => {
  console.log('Server is listening: 8000');
});
