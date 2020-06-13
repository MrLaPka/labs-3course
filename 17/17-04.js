const redis = require("redis");

const client = redis.createClient("//127.0.0.1:6379");

client.set("incr", 0);
console.time("HsetTimer");
for (let n = 1; n < 10001; n++) {
  client.hset(n, n+1, `{id:${n}, val:'val-${n}'}`);
}
console.timeEnd("HsetTimer");
console.time("HgetTimer");
for (let n = 1; n < 10001; n++) {
  client.hget(n, n+1);
}
console.timeEnd("HgetTimer");
client.quit();
