import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { Meteor } from 'meteor/meteor';

export const Account = Class.create({
    name: 'Account',
    collection: Meteor.users,
    fields: {
        personID: Mongo.ObjectID,
        username: {
            type: String,
            validators: [{ type: 'notNull' }]
        },
        roleIDs: [Mongo.ObjectID]
    },
    indexes: {
        username: { fields: { username: 1 }, options: { unique: true } }
    }
});

export const Person = Class.create({
    name: 'Person',
    collection: new Mongo.Collection('people'),
    fields: {
        firstName: {
            type: String,
            validators: [{ type: 'string' }, { type: 'notNull' }]
        },
        lastName: {
            type: String,
            validators: [{ type: 'string' }, { type: 'notNull' }]
        },
        accountID: {
            type: Mongo.ObjectID,
            validators: [{ type: 'notNull' }]
        },
        jobProfileID: {
            type: Mongo.ObjectID,
            validators: [{ type: 'notNull' }]
        },
        managerID: Mongo.ObjectID,
        contactID: {
            type: Mongo.ObjectID,
            validators: [{ type: 'notNull' }]
        }
    }
});

export const Contact = Class.create({
    name: 'Contact',
    collection: new Mongo.Collection('contacts'),
    fields: {
        personID: {
            type: Mongo.ObjectID,
            validators: [{ type: 'notNull' }]
        },
        email: {
            type: String,
            validators: [{ type: 'email' }, { type: 'notNull' }]
        },
        address: {
            type: String,
            validators: [{ type: 'notNull' }]
        },
        phone: {
            type: String,
            validators: [{ type: 'notNull' }, { type: 'regexp', param: /\+?\d+/ }] // FIXME
        }
    },
    indexes: {
        title: { fields: { email: 1 }, options: { unique: true } }
    }
});

export const JobProfile = Class.create({
    name: 'JobProfile',
    collection: new Mongo.Collection('job_profiles'),
    fields: {
        title: {
            type: String,
            validators: [{ type: 'string' }, { type: 'notNull' }]
        },
        description: String,
        baseSalary: Number
    }
});

export const Role = Class.create({
    name: 'Role',
    collection: new Mongo.Collection('roles'),
    fields: {
        name: {
            type: String,
            validators: [{ type: 'notNull' }]
        },
        accessIDs: [Mongo.ObjectID]
    },
    indexes: {
        title: { fields: { name: 1 }, options: { unique: true } }
    }
});

export const Access = Class.create({
    name: 'Access',
    collection: new Mongo.Collection('accesses'),
    fields: {
        code: {
            type: String,
            validators: [{ type: 'notNull' }]
        },
        description: String
    },
    indexes: {
        title: { fields: { code: 1 }, options: { unique: true } }
    }
});
