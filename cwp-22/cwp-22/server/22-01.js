const https = require("https");
const fs = require("fs");
// x509 -req -in LAB.csr -CA CA.crt -CAkey CA.key -CAcreateserial -out LAB.crt -days 365 -sha256 -extensions v3_req -extfile LAB.cfg
const options = {
  key: fs.readFileSync("LAB.key"),
  cert: fs.readFileSync("LAB.crt")
};

https
  .createServer(options, (req, res) => {
    console.log("hello from https");
    res.end("Wow! HTTPS works!");
  })
  .listen(3443, () => {
    console.log("Server has been started");
    console.log(options.key);
    console.log(options.cert);
  });
//12345678
//x509  -req -in LAB.csr -CA CA.crt -CAkey CA.key -CAcreateserial -out LAB.crt -days 365 -sha256 -extensions v3_req -extfile LAB.cfg
