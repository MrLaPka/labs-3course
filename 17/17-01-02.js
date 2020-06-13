const redis = require("redis");

const client = redis.createClient("//127.0.0.1:6379");

client.on("ready", () => {
  console.log("ready");
});
client.on("error", err => {
  console.log("error ", err);
});

client.on("connect", () => {
  console.log("connect");
});

client.on("end", () => {
  console.log("end");
});

console.time("SetTimer");
for (let n = 1; n < 10001; n++) {
   client.set(n, `set${n}`);
}
console.timeEnd("SetTimer");

console.time("GetTimer");
for (let n = 1; n < 10001; n++) {
   client.get(n);
}
console.timeEnd("GetTimer");

console.time("DelTimer");
for (let n = 1; n < 10001; n++) {
  client.del(n);
}
console.timeEnd("DelTimer");
client.quit();

