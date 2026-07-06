const mongoose = require('mongoose');
const { createApp } = require('./app');
const { env } = require('./config/env');

async function start() {
  const connectDB = require("./config/db");
  await connectDB(); 

  const app = createApp();

  app.listen(env.PORT, () => {
    console.log(`Server running at http://localhost:${env.PORT}`);
  });
}

start().catch((err) => {
  console.error('[backend] failed to start', err);
  process.exit(1);
});