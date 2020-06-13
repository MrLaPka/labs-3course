const express = require('express');
const fs = require('fs');
const app = express();

app.use('/', express.static('public'));

const wasmCode = fs.readFileSync('./p.wasm');
const wasmImports = {};
const wasmModule = new WebAssembly.Module(wasmCode);
const wasmInstance = new WebAssembly.Instance(wasmModule, wasmImports);

app.get('/', (req, res, next) => {
  res.json({
    'sum(3,4)': wasmInstance.exports.sum(3, 4),
    'sub(3,4)': wasmInstance.exports.sub(3, 4),
    'mul(3,4)': wasmInstance.exports.mul(3, 4),
    'div(3,4)': wasmInstance.exports.div(3, 4),
  });
});

app.listen(3000, () => {
  console.log('The server started');
});
