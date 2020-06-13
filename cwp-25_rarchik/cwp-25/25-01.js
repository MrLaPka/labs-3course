const jsonRpcServer = require('jsonrpc-server-http-nats');

const server = new jsonRpcServer();

server.on('Ping', (response) => {
  let error = null;
  let result = 'Pong';
  response(error, result);
});
const numberArrayValidator = (params) => {
  if (!Array.isArray(params)) {
    throw new Error('Array expected');
  }

  params.forEach(p => {
    if (!isFinite(p)) {
      throw new Error('All params should be number');
    }
  });

  return params;
};

server.on('sum', numberArrayValidator, (params, channel, response) => {
  response(null, params.reduce((accumulator, currentValue) => accumulator + currentValue));
});

server.on('mul', numberArrayValidator, (params, channel, res) => {
  res(null, params.reduce((accumulator, currentValue) => accumulator * currentValue));
});

server.on('div', numberArrayValidator, (params, channel, res) => {
  res(null, params[0] / params[1]);

});

server.on('proc', numberArrayValidator, (params, channel, res) => {
  res(null, params[0] / params[1] * 100);

});

server.listenHttp({
  host: '127.0.0.1',
  port: 3000,

}, () => {
  console.log('Server started');
});

