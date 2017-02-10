'use strict';
import crypto from 'crypto';
import Promisse from 'bluebird';
import config from '../../config/env';
import User from '../models/user.model';
import TokenBusiness from './token.business';

class UserBusiness {

	constructor() { }

    get(id) {
        return User.get(id);
    };

    update(uservm) {
        return User.update({_id: uservm._id}, {$set: { name: uservm.name }});
    };

    updatePassword(uservm) {
        let hashPassword = crypto.createHmac('sha256', config.secret)
                               .update(uservm.password)
                               .digest('hex');

        uservm.password = hashPassword;

        return User.update({_id: uservm._id}, {$set: { password: uservm.password }});
    };

    create(uservm) {
        let hashPassword = crypto.createHmac('sha256', config.secret)
                               .update(uservm.password)
                               .digest('hex');

        uservm.password = hashPassword;

        return User.create(uservm);
    };

    remove(id) {
        let tokenBusiness = new TokenBusiness();

        return User.delete({_id: id})
                .then(status => {
                  return tokenBusiness.removeByUser(id);
                });
    };
}

export default UserBusiness;