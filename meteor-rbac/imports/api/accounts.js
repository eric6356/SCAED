import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import * as c from '../models/collections';
import { toMongo } from './utils';

Meteor.methods({
    'account.remove'(accountID) {
        const account = c.Account.findOne(accountID);
        account && account.remove();
    },
    'account.create'({ username, password, profile }) {
        // TODO: figure the best practice
        if (Meteor.isServer) {
            profile.roleIDs = toMongo(profile.roleIDs);
            return Accounts.createUser({ username, password, profile });
        }
    },
    'account.modify'({ _id, params }) {
        if (Meteor.isServer) {
            const account = c.Account.findOne(_id);
            if (!account) {
                throw new Meteor.Error(404);
            }
            const { username, password, profile } = params;
            if (password) {
                Accounts.setPassword(account._id, password);
            }
            profile.roleIDs = toMongo(profile.roleIDs);
            account.set({ username, profile });
            return account.save();
        }
    }
});
