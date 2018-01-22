import { Meteor } from 'meteor/meteor';

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
    }
});
