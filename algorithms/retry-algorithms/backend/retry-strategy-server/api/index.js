const express = require("express");
const bodyParser = require("body-parser");
const retryStrategies = require("./retry_strategies");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const strategies = {
  cancel: retryStrategies.cancel,
  immediate_retry: retryStrategies.immediateRetry,
  fixed_intervals: () => retryStrategies.fixedIntervals(2, 5),
  incremental_intervals: () => retryStrategies.incrementalIntervals(1, 1, 5),
  exponential_backoff: () => retryStrategies.exponentialBackoff(1, 5),
  exponential_backoff_with_jitter: () =>
    retryStrategies.exponentialBackoffWithJitter(1, 5),
};

app.post("/retry", async (req, res) => {
  const { strategy } = req.body;
  if (strategy in strategies) {
    const result = await strategies[strategy]();
    if (result) {
      res.json(result);
    } else {
      res.status(500).json({ error: "All retries failed" });
    }
  } else {
    res.status(400).json({ error: "Invalid strategy" });
  }
});

app.listen(port, () => {
  console.log(`Retry strategy server listening at http://localhost:${port}`);
});
