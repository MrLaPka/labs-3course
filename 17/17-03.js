const redis = require("redis");

const client = redis.createClient("//127.0.0.1:6379");

client.set("incr", 0);
console.time("IncrTimer");
for (let i = 0; i < 10000; i++) {
  client.incr("incr");
}
console.timeEnd("IncrTimer");
console.time("DecrTimer");
for (let i = 0; i < 10000; i++) {
  client.decr("incr");
}
console.timeEnd("DecrTimer");
client.quit();
