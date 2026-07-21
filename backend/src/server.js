const { createApp } = require("./app");
const { env } = require("./config/env");
const { connectMongo } = require("./database/mongoose");

async function start() {
  // Connect to MongoDB
  // eslint-disable-next-line no-console
  console.log("[backend] connecting to MongoDB...");
  await connectMongo({ uri: env.MONGODB_URI });
  // eslint-disable-next-line no-console
  console.log("[backend] MongoDB connected.");

  const app = createApp();

  app.listen(env.PORT, () => {
    console.log(`Server running at http://localhost:${env.PORT}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("[backend] failed to start", err);
  process.exit(1);
});
