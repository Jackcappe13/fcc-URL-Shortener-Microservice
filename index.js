require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dns = require("dns");
let bodyParser = require("body-parser");
const { url } = require("inspector");
const { hostname } = require("os");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/shorturl/:shorturl", (req, res) => {
  // redirect short url to original url
  res.redirect(user_url);
});
// process post function
app.post("/api/shorturl", function (req, res) {
  // Get entire url from user input
  user_url = new URL(req.body.url);
  console.log(user_url);
  // check if url is valid by removing protocol and leaving only the hostname, then lookup with dns
  dns.lookup(user_url.hostname, (error, address, family) => {
    if (error) {
      res.json({
        error: "invalid url",
      });
    } else {
      // output
      res.json({
        original_url: user_url,
        short_url: Math.floor(Math.random() * 10) + 1,
      });
    }
  });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
