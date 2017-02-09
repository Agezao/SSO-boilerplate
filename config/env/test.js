export default {
  env: 'test',
  jwtSecret: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
  db: 'mongodb://localhost/express-mongoose-es6-rest-api-test',
  unsecuredRoutes: ['/api/signup', '/api/login', '/api/password/recovery', '/api/password/update'],
  port: 4040
};
