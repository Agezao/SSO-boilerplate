import Joi from 'joi';

export default {

  // UPDATE /api/password/update
  updatePassword: {
    body: {
      recoveryCode: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /api/password/recovery
  passwordRecovery: {
    body: {
      email: Joi.string().required()
    }
  },

  // UPDATE /api/user
  updateUser: {
    body: {
      name: Joi.string().required()
    }
  },

  // POST /api/login
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /api/signup
  signup: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
