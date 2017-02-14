import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import UserBusiness from '../business/user.business';
import TokenBusiness from '../business/token.business';
import ResponseFactory from '../factories/response.factory'

const _responseFactory = new ResponseFactory();


/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
    const userBusiness = new UserBusiness();
    const tokenBusiness = new TokenBusiness();

    userBusiness.get({
        email: req.body.email
    })
    .then(vm => {
        const err = new APIError('Invalid Email/Password', httpStatus.UNAUTHORIZED);

        if(!vm || vm.length == 0)
            return next(err);

        if(!userBusiness.checkPassword(vm[0], req.body.password))
            return next(err);

        tokenBusiness.create(req.decoded._id)
            .then(token => {
                delete vm[0]['password'];

                res.json(_responseFactory.success({
                    token: token,
                    user: vm[0]
                }));
            }).catch(e => next(e));
    })
    .catch(e => next(e));
}

/**
 * Returns jwt token if valid signup
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function signup(req, res, next) {
    const userBusiness = new UserBusiness();
    const tokenBusiness = new TokenBusiness();
    const userModel = {
        name:  req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    userBusiness.create(userModel)
        .then(uservm => {
            tokenBusiness.create(uservm._id)
            .then(token => {
                delete uservm['password'];

                res.json(_responseFactory.success({
                    token: token,
                    user: uservm
                }));
            })
            .catch(e => next(e));    
        })
        .catch(e => next(e));
}

export default { login, signup };
