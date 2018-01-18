import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import * as c from '../models/collections';

Meteor.methods({
    'account.remove'(accountID) {
        const account = c.Account.findOne(accountID);
        account && account.remove();
    },
    'account.create'({ username, password }) {
        // TODO: figure the best practice
        if (Meteor.isServer) {
            return Accounts.createUser({ username, password });
        }
    }
});
