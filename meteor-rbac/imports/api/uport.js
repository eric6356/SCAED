import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import * as c from '../models/collections';

if (Meteor.isServer) {
    Accounts.registerLoginHandler('uport', function(request) {
        if (!request.uportCredentials) {
            return;
        }
        const credentials = request.uportCredentials;

        let account = c.Account.findOne({
            'profile.uportCredentials.address': credentials.address
        });
        if (!account) {
            account = new c.Account();
            account.profile.uportCredentials = credentials;
            account.username = credentials.address;
            account.save();
        }
        return { userId: account._id };
    });
}
