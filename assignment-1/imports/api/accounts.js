import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import * as c from '../models/collections';

Meteor.methods({
    'accounts.remove'(accountID) {
        const account = c.Account.findOne(accountID);
        account && account.remove();
    },
    'accounts.create'({ username, password }) {
        // TODO: figure the best practice
        if (Meteor.isClient) {
            console.log('client');
            const res = Accounts.createUser({ username, password });
            console.log(res);
        } else {
            console.log('server');
            const res = Accounts.createUser({ username, password });
            console.log(res);
        }
    }
});
