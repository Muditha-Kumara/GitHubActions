import express from 'express';
import client from 'prom-client';
import { handler } from './index.js';

const app = express();
const port = 3000;

// Create a Registry which registers the metrics
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'interest-rates-app'
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

// Define your custom metrics
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [50, 100, 200, 300, 400, 500, 600, 800, 1000]
});

// Register the custom metrics
register.registerMetric(httpRequestDurationMicroseconds);

app.get('/interest-rates', async (req, res) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  const response = await handler();
  res.status(response.statusCode).send(response.body);
  end({ route: req.route.path, code: res.statusCode, method: req.method });
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});