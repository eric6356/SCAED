import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { Meteor } from 'meteor/meteor';

const Person = Class.create({
    name: 'Person',
    fields: {
        firstName: {
            type: String,
            validators: [{ type: 'string' }],
            optional: true
        },
        lastName: {
            type: String,
            validators: [{ type: 'string' }],
            optional: true
        },
        jobProfileID: {
            type: Mongo.ObjectID,
            optional: true
        },
        contactID: {
            type: Mongo.ObjectID,
            optional: true
        }
    },
    helpers: {
        getFullName: () => `${this.firstName} ${this.lastName}`
    }
});

export const AccountProfile = Class.create({
    name: 'AccountProfile',
    fields: {
        person: {
            type: Person,
            default: () => new Person()
        },
        managerID: {
            type: String,
            optional: true
        },
        roleIDs: {
            type: [Mongo.ObjectID],
            default: []
        }
    }
});

export const Account = Class.create({
    name: 'Account',
    collection: Meteor.users,
    fields: {
        username: String,
        profile: {
            type: AccountProfile,
            default: () => new AccountProfile()
        }
    },
    helpers: {
        getManager() {
            return this.profile.managerID && Account.findOne(managerID);
        },
        getRoles() {
            return this.profile.roleIDs ? Role.find({ _id: { $in: this.profile.roleIDs } }) : [];
        },
        getContact() {
            const id = this.profile.person.contactID;
            return id && Contact.findOne(id);
        },
        getJobProfile() {
            const id = this.profile.person.jobProfileID;
            return id && JobProfile.findOne(id);
        }
    }
});

export const Contact = Class.create({
    name: 'Contact',
    collection: new Mongo.Collection('contacts', { idGeneration: 'MONGO' }),
    fields: {
        email: {
            type: String,
            validators: [{ type: 'email' }]
        },
        address: {
            type: String,
            optional: true
        },
        phone: {
            type: String,
            validators: [{ type: 'regexp', param: /\+?\d+/ }], // FIXME
            optional: true
        }
    },
    indexes: {
        email: { fields: { email: 1 }, options: { unique: true } }
    }
});

export const JobProfile = Class.create({
    name: 'JobProfile',
    collection: new Mongo.Collection('job_profiles', { idGeneration: 'MONGO' }),
    fields: {
        title: String,
        description: {
            type: String,
            optional: true
        },
        baseSalary: {
            type: Number,
            optional: true
        }
    }
});

export const Role = Class.create({
    name: 'Role',
    collection: new Mongo.Collection('roles', { idGeneration: 'MONGO' }),
    fields: {
        name: String,
        accessIDs: {
            type: [Mongo.ObjectID],
            default: []
        }
    },
    indexes: {
        name: { fields: { name: 1 }, options: { unique: true } }
    },
    helpers: {
        getAccesses() {
            return this.accessIDs ? Access.find({ _id: { $in: this.accessIDs } }) : [];
        }
    }
});

export const Access = Class.create({
    name: 'Access',
    collection: new Mongo.Collection('accesses', { idGeneration: 'MONGO' }),
    fields: {
        code: String,
        endpoint: String,
        description: {
            type: String,
            optional: true
        }
    },
    indexes: {
        code: { fields: { code: 1 }, options: { unique: true } }
    }
});
