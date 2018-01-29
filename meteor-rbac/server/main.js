import { Meteor } from 'meteor/meteor';

import '../imports/api';
import { initFixture } from '../imports/models/fixtures';
import { initPrivateFixture } from '../imports/models/privateFixtures';
import * as c from '../imports/models/collections';

Meteor.startup(() => {
    // code to run on server at startup
    initFixture();
    initPrivateFixture();
    Meteor.publish('account.all', () => c.Account.find());
    // Meteor.publish('account.hasTempAccess', () =>
    //     c.Account.find({ 'profile.tempAccesses.0': { $exists: true } })
    // );
    Meteor.publish('role.all', () => c.Role.find());
    Meteor.publish('access.all', () => c.Access.find());
    Meteor.publish('contact.all', () => c.Contact.find());
    Meteor.publish('jobProfile.all', () => c.JobProfile.find());
    Meteor.publish('uportConfig.all', () => c.UPortConfig.find());
});
