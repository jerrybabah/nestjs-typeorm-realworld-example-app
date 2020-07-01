module.exports = [
  {
    name: 'default',
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/database/entities/*.entity.ts'],
    migrations: ['dist/database/migrations/*.ts'],
    migrationsTableName: 'migration',
    cli: {
      migrationsDir: 'dist/database/migrations',
      entitiesDir: 'dist/database/entities',
    },
    logging: process.env.NODE_ENV === 'development', // dev only
  }, {
    name: 'cli',
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['src/database/entities/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts'],
    migrationsTableName: 'migration',
    cli: {
      migrationsDir: 'src/database/migrations',
      entitiesDir: 'src/database/entities',
    },
    logging: process.env.NODE_ENV === 'development', // dev only
  }
]