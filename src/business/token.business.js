'use strict';
import Promisse from 'bluebird';
import Token from '../models/token.model';

class TokenBusiness {

	constructor() { }

    get(token) {
        return Token.get(token);
    };

    refresh(tokenvm) {
        let today = new Date().getTime();

        tokenvm.expire = new Date(today + 36000000);
        
        return Token.findOneAndUpdate({_id: tokenvm._id}, tokenvm);
    };

    create(tokenvm) {
        return Token.create(tokenvm);
    };

    removeByUser(user_id) {
        return Token.delete({ user_id: user_id });
    };
}

export default TokenBusiness;