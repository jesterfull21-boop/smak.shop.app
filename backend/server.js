const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const TOKEN = "ВСТАВЬ_СЮДА_ТОКЕН";
const CHAT_ID = "ВСТАВЬ_СЮДА_CHAT_ID";

const products = [
  { id:1, name:"Vozol Mint Ice", price:50 },
  { id:2, name:"Elf Bar 4000", price:60 }
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/order', async (req, res) => {
  const { cart, name, phone } = req.body;

  let text = "🆕 Новый заказ\n\n";

  for (let item in cart) {
    text += `${item} x${cart[item]}\n`;
  }

  text += `\n👤 ${name}\n📞 ${phone}`;

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text
    })
  });

  res.send("OK");
});

app.listen(3000, () => console.log("Server started"));
