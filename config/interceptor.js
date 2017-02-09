'use strict'

import config from './env';
import ResponseFactory from '../src/factories/responseFactory';

const _responseFactory = new ResponseFactory();

function intercept(err, req, res, next) {

	if(config.unsecuredRoutes.indexOf(req.path) >= 0)
		return next();

	if(!req.headers['authorization-token'])
		return res.status(403).send(_responseFactory.fail(-1, "No Token presented"));

	//TO-DO
	// Check token existence && Expiration Date
	// If is valid, add userId to req.decoded._id = xx
	// If it's NOT valid, retorn 403
	next();
}

export default intercept;