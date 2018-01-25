import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import * as c from '../../models/collections';

Accounts.onLogin(() => {
    const roleID = Accounts.user().profile.roleIDs[0];
    Session.setDefault('currentRoleID', roleID);

    Meteor.call('account.tempMenus', { _id: Accounts.user()._id }, (err, res) => {
        Session.set('tempMenus', res);
    });

    const next = FlowRouter.current().queryParams.next || '/';
    FlowRouter.go(next);
});
