const express = require("express");
const app = express();
const port = 6000;

app.get("/unstable-endpoint", (req, res) => {
  if (Math.random() < 0.5) {
    res.status(500).json({ error: "Request failed" });
  } else {
    res.status(200).json({ message: "Request succeeded" });
  }
});

app.listen(port, () => {
  console.log(`Unstable server listening at http://localhost:${port}`);
});
module.exports = app;
