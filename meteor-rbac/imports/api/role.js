import { Meteor } from 'meteor/meteor';
import wildcard from 'wildcard';

import { ensureMongo } from './utils';
import * as c from '../models/collections';

Meteor.methods({
    'role.create'({ name, accessIDs }) {
        if (Meteor.isServer) {
            // TODO: validation
            const role = new c.Role();
            accessIDs = ensureMongo(accessIDs);
            role.set({ name, accessIDs });
            return role.save();
        }
    },
    'role.modify'({ _id, params }) {
        if (Meteor.isServer) {
            // TODO: validation
            const role = c.Role.findOne(_id);
            if (!role) {
                throw new Meteor.Error(404);
            }
            const { name, accessIDs } = params;
            role.set({ name, accessIDs: ensureMongo(accessIDs) });
            return role.save();
        }
    },
    'role.canAccess'({ _id, path }) {
        if (Meteor.isServer) {
            const account = Meteor.user();
            let roleExists = false;
            for (let roleID of account.profile.roleIDs) {
                if (roleID.equals(_id)) {
                    roleExists = true;
                    break;
                }
            }
            if (!roleExists) {
                return false;
            }

            let canAccess = false;
            c.Role.findOne(_id)
                .getAccesses()
                .forEach(access => {
                    canAccess = canAccess || !!wildcard(access.endpoint, path);
                });
            return canAccess;
        }
    }
});
