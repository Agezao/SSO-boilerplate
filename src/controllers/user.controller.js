'use srict';

import UserBusiness from '../business/user.business';
import TokenBusiness from '../business/token.business';
import ResponseFactory from '../factories/response.factory'

const _responseFactory = new ResponseFactory();
const _userBusiness = new UserBusiness();

/**
 * Get user
 * @returns {User}
 */
function get(req, res, next) {
  _userBusiness.get(req.decoded._id)
    .then(user => {
      res.json(_responseFactory.success(user.toObject()));
    })
    .catch(e => next(e));
}

/**
 * Create new user
 * @property {string} req.body.name - The name of user.
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The password of user.
 * @returns {User}
 */
function create(req, res, next) {
  let uservm = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  _userBusiness.create(uservm)
    .then(savedUser => {
      res.json(_responseFactory.success(savedUser.toObject())) 
    })
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.name - The name of user.
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The password of user.
 * @returns {User}
 */
function update(req, res, next) {
  let user = req.body;
  user.name = req.body.name;

  _userBusiness.update(user)
    .then(savedUser => {
      res.json(_responseFactory.success(savedUser.toObject()))
    })
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  _userBusiness.remove(req.decoded._id)
    .then(status => {
      const tokenBusiness = new TokenBusiness();

      tokenBusiness.removeByUser(req.decoded._id);

      res.json(_responseFactory.success(status))
    })
    .catch(e => next(e));
}

export default { get, create, update, remove };
