module.exports = [
  {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    entityPrefix: 'tb_',
    entities: ['libs/database/src/entities/*.entity{.ts,.js}'],
    migrationsTableName: 'migrations',
    migrations: ['libs/database/src/migrations/*{.ts,.js}'],
    cli: {
      migrationsDir: 'libs/database/src/migrations',
    },
    logging: true,
  },
];
