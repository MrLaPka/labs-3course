const express = require("express");
const app = require("express")();
const multer = require("multer");
const { createClient } = require("webdav");
const fs = require('fs');

const client = createClient("https://webdav.yandex.ru", {
  username: "corporatemailisg",
  password: "GB6K824a"
});
app.use(express.static("public"));
app.use(multer().single("file"));
app.listen(8080);

app.post("/md/:directory", (req, res) => {
  const directory = req.params.directory;
  client
    .exists(directory)
    .then(result => {
      if (result) {
        res.writeHead(408, { "Content-Type": "text/plain;charset=utf-8" });
        res.end("Directory exists already");
      } else {
        client.createDirectory(directory);
        res.sendStatus(201);
      }
    })
    .catch(err => {
      console.error(err);
    });
});

app.post("/rd/:directory", (req, res) => {
  const directory = req.params.directory;
  client
    .exists(directory)
    .then(result => {
      if (!result) {
        res.writeHead(408, { "Content-Type": "text/plain;charset=utf-8" });
        res.end("Directory doesn't exist");
      } else {
        client.deleteFile(directory);
        res.sendStatus(204);
      }
    })
    .catch(err => {
      console.error(err);
    });
});

app.post("/up/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  try {
    const ws = client.createWriteStream(fileName);
    console.log(fileName);
    ws.write(fs.readFileSync(fileName));
    ws.end();
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.writeHead(408, { "Content-Type": "text/plain;charset=utf-8" });
    res.end("An error occurred while uploading the file");
  }
});

app.post("/down/:fileName", function(req, res) {
  const fileName = req.params.fileName;
  client
    .exists(fileName)
    .then(result => {
      if (!result) {
        res.sendStatus(404);
      } else {
        client.createReadStream(fileName).pipe(res);
      }
    })
    .catch(err => {
      console.error(err);
    });
});

app.post("/del/:fileName", function(req, res) {
  const fileName = req.params.fileName;
  client
    .exists(fileName)
    .then(result => {
      if (!result) {
        res.sendStatus(404);
      } else {
        client.deleteFile(fileName);
        res.sendStatus(204);
      }
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/copy/:sourceFile/:destFile", function(req, res) {
  const source = req.params.sourceFile;
  const destination = req.params.destFile;
  client
    .exists(source)
    .then(result => {
      if (!result) {
        res.sendStatus(404);
      } else {
        client.copyFile(source, destination);
        res.sendStatus(200);
      }
    })
    .catch(err => {
      console.error(err);
      res.writeHead(408, { "Content-Type": "text/plain;charset=utf-8" });
      res.end("An error occurred while uploading the file");
    });
});

app.post("/move/:sourceFile/:destFile", function(req, res) {
  const source = req.params.sourceFile;
  const destination = req.params.destFile;
  client
    .exists(source)
    .then(result => {
      if (!result) {
        res.sendStatus(404);
      } else {
        client.moveFile(source, destination);
        res.sendStatus(200);
      }
    })
    .catch(err => {
      console.error(err);
    });
});
