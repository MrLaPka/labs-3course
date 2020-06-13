const Telegraf = require("telegraf");
const app = new Telegraf("1199560776:AAHmNKx8WBd0FeEOkh8G6LPbs6zpb_oyD9c");

app.on("text", ctx => {
  const message = ctx.message.text;
  return ctx.reply('echo: '+ message);
});

app.startPolling();
