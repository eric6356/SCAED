import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';
import { Meteor } from 'meteor/meteor';

export const AccountProfile = Class.create({
    name: 'AccountProfile',
    fields: {
        personID: {
            type: Mongo.ObjectID,
            optional: true
        },
        roleIDs: {
            type: [Mongo.ObjectID],
            default: []
        }
    },
    helpers: {
        getPerson() {
            return this.personID && Person.findOne(this.personID);
        },
        getRoles() {
            return this.roleIDs ? Role.find({ _id: { $in: this.roleIDs } }) : [];
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
            optional: true
        }
    }
});
// Account.createAccount = ({ username, password }) => {
//     let account = Account.findOne({ username });
//     if (account) {
//         return {
//             msg: 'Username exists.'
//         };
//     } else {
//         account = new Account();
//         account.username = username;
//         account.save();

//     }
// };

export const Person = Class.create({
    name: 'Person',
    collection: new Mongo.Collection('people', { idGeneration: 'MONGO' }),
    fields: {
        firstName: {
            type: String,
            validators: [{ type: 'string' }]
        },
        lastName: {
            type: String,
            validators: [{ type: 'string' }]
        },
        accountID: String,
        jobProfileID: {
            type: Mongo.ObjectID,
            optional: true
        },
        managerID: {
            type: String,
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

export const Contact = Class.create({
    name: 'Contact',
    collection: new Mongo.Collection('contacts', { idGeneration: 'MONGO' }),
    fields: {
        personID: Mongo.ObjectID,
        email: {
            type: String,
            validators: [{ type: 'email' }]
        },
        address: String,
        phone: {
            type: String,
            validators: [{ type: 'regexp', param: /\+?\d+/ }] // FIXME
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
