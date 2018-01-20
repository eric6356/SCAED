import { Meteor } from 'meteor/meteor';

import { toMongo } from './utils';
import * as c from '../models/collections';

Meteor.methods({
    'role.create'({ name, accessIDs }) {
        if (Meteor.isServer) {
            // TODO: validation
            const role = new c.Role();
            accessIDs = toMongo(accessIDs);
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
            role.set({ name, accessIDs: toMongo(accessIDs) });
            return role.save();
        }
    }
});
