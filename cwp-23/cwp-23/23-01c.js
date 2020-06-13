const fs = require('fs');
const axios = require('axios');
const { ClientDH } = require('./23-01m2');
const decipherFile = require('./23-01m').decipherFile;

const sendClientContext = async (context) => {
  await axios.post('http://localhost:8000/key', context);
};

const getResource = async (serverContext, clientDH) => {
  const res = await axios.get('http://localhost:8000/resource', { responseType: 'stream' });

  const file = fs.createWriteStream('./txt/de.txt');
  const key = new Buffer(32);
  const clientSecret = clientDH.getSecret(serverContext);

  clientSecret.copy(key, 0, 0, 32);
  decipherFile(res.data, file, key);
};

(async () => {
  try {
    const serverContext = await axios.get('http://localhost:8000');
    const clientDH = new ClientDH(serverContext.data);

    console.log('context', clientDH.getContext());

    await sendClientContext(clientDH.getContext());
    await getResource(serverContext.data, clientDH);
  } catch (e) {
    console.error('An error occurred:', e);
  }
})();
