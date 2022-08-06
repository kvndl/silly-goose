// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

// Database Connection Info
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DATABASE = process.env.DB_DATABASE;

const DATABASE_URL = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

// Medusa uses Redis, so this needs configuration as well
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

// Spaces
const SPACE_URL = process.env.SPACE_URL || "";
const SPACE_BUCKET = process.env.SPACE_BUCKET || "";
const SPACE_ENDPOINT = process.env.SPACE_ENDPOINT || "";
const SPACE_ACCESS_KEY_ID = process.env.SPACE_ACCESS_KEY_ID || "";
const SPACE_SECRET_ACCESS_KEY = process.env.SPACE_SECRET_ACCESS_KEY || "";

// Sendgrid keys
// const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "";
// const SENDGRID_FROM = process.env.SENDGRID_FROM || "";
// const SENDGRID_ORDER_PLACED_ID = process.env.SENDGRID_ORDER_PLACED_ID || "";
// const SENDGRID_ORDER_PLACED_ID_LOCALIZED = process.env.SENDGRID_ORDER_PLACED_ID_LOCALIZED || "";

// This is the place to include plugins. See API documentation for a thorough guide on plugins.
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: STRIPE_API_KEY,
      webhook_secret: STRIPE_WEBHOOK_SECRET,
    },
  },
  {
    resolve: `medusa-file-spaces`,
    options: {
        spaces_url: SPACE_URL,
        bucket: SPACE_BUCKET,
        endpoint: SPACE_ENDPOINT,
        access_key_id: SPACE_ACCESS_KEY_ID,
        secret_access_key: SPACE_SECRET_ACCESS_KEY,
    },
  },
];

module.exports = {
  projectConfig: {
    redis_url: REDIS_URL,
    database_url: DATABASE_URL,
    database_type: "postgres",
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
    database_extra: { ssl: { rejectUnauthorized: false } }
  },
  plugins,
};
