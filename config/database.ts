import path from 'path';

/**
 * Strapi database configuration
 * ─────────────────────────────
 * Default client is mysql; override via DATABASE_CLIENT
 * or add env-specific files under config/env/*.
 */
export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'mysql');   // mysql | postgres | sqlite

  const connections = {
    /* ——— MySQL / MariaDB ——— */
    mysql: {                         // ← rename key from mysql2 → mysql
      connection: {
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi_dev'),
        user: env('DATABASE_USERNAME', 'strapi'),   // field must be `user`
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl:
          env.bool('DATABASE_SSL', false) && {
            key: env('DATABASE_SSL_KEY'),
            cert: env('DATABASE_SSL_CERT'),
            ca: env('DATABASE_SSL_CA'),
            capath: env('DATABASE_SSL_CAPATH'),
            cipher: env('DATABASE_SSL_CIPHER'),
            rejectUnauthorized: env.bool(
              'DATABASE_SSL_REJECT_UNAUTHORIZED',
              true,
            ),
          },
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
    },

    /* ——— PostgreSQL ——— */
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'),
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl:
          env.bool('DATABASE_SSL', false) && {
            key: env('DATABASE_SSL_KEY'),
            cert: env('DATABASE_SSL_CERT'),
            ca: env('DATABASE_SSL_CA'),
            capath: env('DATABASE_SSL_CAPATH'),
            cipher: env('DATABASE_SSL_CIPHER'),
            rejectUnauthorized: env.bool(
              'DATABASE_SSL_REJECT_UNAUTHORIZED',
              true,
            ),
          },
        schema: env('DATABASE_SCHEMA', 'public'),
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
    },

    /* ——— SQLite ——— */
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          '..',
          '..',
          env('DATABASE_FILENAME', '.tmp/data.db'),
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],          // now resolves correctly
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60_000),
    },
  };
};

