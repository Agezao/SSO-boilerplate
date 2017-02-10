export default {
  env: 'test',
  secret: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
  db: 'mongodb://localhost/sso',
  unsecuredRoutes: ['/api/signup', '/api/login', '/api/password/recovery', '/api/password/update'],
  port: 4040
};
