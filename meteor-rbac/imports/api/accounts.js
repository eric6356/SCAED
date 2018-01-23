import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import * as c from '../models/collections';
import { ensureMongo } from './utils';

Meteor.methods({
    'account.remove'(accountID) {
        const account = c.Account.findOne(accountID);
        account && account.remove();
    },
    'account.create'({ username, password, profile }) {
        // TODO: figure the best practice
        if (Meteor.isServer) {
            profile.roleIDs = ensureMongo(profile.roleIDs);
            const account = Accounts.createUser({ username, password, profile });
            const person = new Person();
            person.accountID = account._id;
            person.save();
            account.personID = person._id;
            account.save();
            return account;
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
            profile.roleIDs = ensureMongo(profile.roleIDs);
            account.set({ username, profile });
            return account.save();
        }
    },
    'account.profile'({ _id, params }) {
        if (Meteor.isServer) {
            const account = c.Account.findOne(_id);
            if (!account) {
                throw new Meteor.Error(404);
            }
            const { firstName, lastName, email, address, phone, jobTitle } = params;
            account.profile.person.firstName = firstName;
            account.profile.person.lastName = lastName;

            const jobProfile = account.getJobProfile() || new c.JobProfile();
            jobProfile.title = jobTitle;
            jobProfile.save();
            if (!account.profile.person.jobProfileID) {
                account.profile.person.jobProfileID = jobProfile._id;
            }

            let contact = account.getContact() || new c.Contact();
            contact.address = address;
            contact.phone = phone;
            contact.email = email;
            contact.save();
            if (!account.profile.person.contactID) {
                account.profile.person.contactID = contact._id;
            }

            account.save();

            return account;
        }
    }
});
