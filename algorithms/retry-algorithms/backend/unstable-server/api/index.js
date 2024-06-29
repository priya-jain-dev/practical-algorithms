const express = require("express");
const app = express();

app.get("/unstable-endpoint", (req, res) => {
  if (Math.random() < 0.5) {
    res.status(500).json({ error: "Request failed" });
  } else {
    res.status(200).json({ message: "Request succeeded" });
  }
});

module.exports = app;
