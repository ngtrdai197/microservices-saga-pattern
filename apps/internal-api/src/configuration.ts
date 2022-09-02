export default () => ({
  env: process.env.ENV || 'dev',
  internal_api_port: process.env.INTERNAL_API_PORT || 5000,
});
