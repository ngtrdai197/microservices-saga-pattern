export default () => ({
  env: process.env.ENV || 'dev',
  database: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'p@ssw0rd',
    name: process.env.MYSQL_DB_NAME || 'mvc_saga_pattern',
  },
});
