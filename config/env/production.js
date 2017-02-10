export default {
  env: 'production',
  MONGOOSE_DEBUG: false,
  jwtSecret: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
  db: 'mongodb://localhost:27017/sso',
  unsecuredRoutes: ['/api/signup', '/api/login', '/api/password/recovery', '/api/password/update'],
  port: 3003
};
