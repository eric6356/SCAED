import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import * as c from '../../models/collections';

Accounts.onLogin(() => {
    const roleID = Accounts.user().profile.roleIDs[0];
    Session.set('currentRoleID', roleID);
    const next = FlowRouter.current().queryParams.next || '/';
    FlowRouter.go(next);
});
