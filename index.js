const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const url = process.env.WEB_HOOK;
function choose() {
  let number = Math.floor(Math.random() * 20) + 1;
  let message = process.env[number];
  if (message) {
    console.log(number + ":" + process.env[number]);
    send(message);
  } else {
    choose();
  }
}
async function send(content) {
  let body = {
    username: process.env.USERNAME || "messageBot",
    avatar_url: process.env.AVATAR_URL,
    content: content,
  };
  const config = {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  };
  try {
    await axios.post(url, body, config);
    console.log("Message sent successfully!");
  } catch (error) {
    console.log("エラーが発生しました" + error.message);
  }
}
//ここを変えることで時間を変更できる 例 1000 = 一秒
setInterval(choose, 300000);
