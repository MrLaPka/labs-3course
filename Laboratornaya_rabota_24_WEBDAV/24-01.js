const webdav = require("webdav-server").v2;
const server = new webdav.WebDAVServer({ port: 3000 });
const express = require("express");
const app = require("express")();
const fs = require("fs");
const { createClient } = require("webdav");
const client = createClient("https://webdav.yandex.ru", {
  username: "corporatemailisg",
  password: "GB6K824a"
});
const multer = require("multer");
app.use(express.static("publ"));
app.use(multer().single("file"));

server.setFileSystem(
  "/",
  new webdav.PhysicalFileSystem("./FS-Webdav"),
  success => {
    server.start(() => {
      console.log("READY");
    });
    app.listen(8080);
  }
);

app.post("/md/[A-я,0-9,%,/,.]+", function(req, res) {
  let s = "/" + req.url.split("/")[2];
  console.log(s);
  let url = decodeURI(s);
  client
    .exists(url)
    .then(result => {
      if (result) {
        res.writeHead(408, { "Content-Type": "text/plain;charset=utf-8" });
        res.end("Такая директория уже существует");
      } else {
        client.createDirectory(url);
        res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        res.end("Директория создана успешно");
      }
    })
    .catch(err => {
      console.log(err);
    });
});
app.post("/rd/[A-я,0-9,%,.]+", function(req, res) {
  let s = "/" + req.url.split("/")[2];
  let url = decodeURI(s);
  client
    .exists(url)
    .then(result => {
      if (!result) {
        res.writeHead(408, { "Content-Type": "text/plain;charset=utf-8" });
        res.end("Такой директории не существует");
      } else {
        client.deleteFile(url);
        res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        res.end("Директория удалена успешно");
      }
    })
    .catch(err => {
      console.log(err);
    });
});
app.post("/up/[A-я,0-9,%,.]+", function(req, res) {
  let s = "/" + req.url.split("/")[2];
  let url = decodeURI(s);

  try {
    let ws = client.createWriteStream(url);
    ws.write(fs.readFileSync('.'+url));
    ws.end();
    res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
    res.end("Файл успешно загружен");
  } catch (err) {
    console.log(err);
    res.writeHead(408, { "Content-Type": "text/plain;charset=utf-8" });
    res.end("Ошибка записи");
  }
});
app.post("/down/[A-я,0-9,%,.]+", function(req, res) {
  let s = "/" + req.url.split("/")[2];
  let url = decodeURI(s);
  client
    .exists(url)
    .then(result => {
      if (!result) {
        res.writeHead(404, { "Content-Type": "text/plain;charset=utf-8" });
        res.end("Такого файла не существует");
      } else {
        res.download("./FS-Webdav" + url);
      }
    })
    .catch(err => {
      console.log(err);
    });
});
app.post("/dow", function(req, res) {
  client.exists("5group.txt").then(result => {
    if (!result) {
      res.writeHead(404, { "Content-Type": "text/plain;charset=utf-8" });
      res.end("Такого файла не существует");
    } else {
      client
        .createReadStream("/5group.txt")
        .pipe(fs.createWriteStream("./5_download.txt"));
      res.end("Файл успешно скачался");
    }
  });
});
app.post("/del/[A-я,0-9,%,.]+", function(req, res) {
  let s = "/" + req.url.split("/")[2];
  let url = decodeURI(s);
  client
    .exists(url)
    .then(result => {
      if (!result) {
        res.writeHead(408, { "Content-Type": "text/plain;charset=utf-8" });
        res.end("Такого файла не существует");
      } else {
        client.deleteFile(url);
        res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        res.end("Файл удален успешно");
      }
    })
    .catch(err => {
      console.log(err);
    });
});
app.post("/copy/[A-я,0-9,%,.]+/[A-я,0-9,%,.]+", function(req, res) {
  let s = "/" + req.url.split("/")[2];
  let d = "/" + req.url.split("/")[3];
  let source = decodeURI(s);
  let destination = decodeURI(d);
  client
    .exists(source)
    .then(result => {
      if (!result) {
        res.writeHead(404, { "Content-Type": "text/plain;charset=utf-8" });
        res.end("Такого файла не существует");
      } else {
        client.copyFile(source, destination);
        res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        res.end("Файл скопирован успешно");
      }
    })
    .catch(err => {
      console.log(err);
    });
});
app.post("/move/[A-я,0-9,%,.]+/[A-я,0-9,%,.]+", function(req, res) {
  let s = "/" + req.url.split("/")[2];
  let d = "/" + req.url.split("/")[3];
  let source = decodeURI(s);
  let destination = decodeURI(d);
  console.log(s);
  console.log(d);
  client
    .exists(source)
    .then(result => {
      if (!result) {
        res.writeHead(404, { "Content-Type": "text/plain;charset=utf-8" });
        res.end("Такого файла не существует");
      } else {
        client.moveFile(source, destination);
        res.writeHead(200, { "Content-Type": "text/plain;charset=utf-8" });
        res.end("Файл перемещен успешно");
      }
    })
    .catch(err => {
      console.log(err);
    });
});
app.get("/html", function(req, res) {
  res.end(fs.readFileSync("./lab24.html"));
});
