import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Spin } from 'antd';
import { FlowRouter } from 'meteor/kadira:flow-router';

import TempAccess from './TempAccess.jsx';
import * as c from '../../models/collections';

export default (TempAccessContainer = withTracker(props => {
    Meteor.subscribe('account.all');
    Meteor.subscribe('access.all');
    const accountID = FlowRouter.getQueryParam('accountID');
    const accountToAdd = accountID && c.Account.findOne(accountID);
    const accesses = c.Access.find().fetch();
    return {
        accountToAdd,
        allAccounts: c.Account.find().fetch(),
        accountsWithTempAccess: c.Account.find({
            'profile.tempAccesses.0': { $exists: true }
        }).fetch(),
        accesses
    };
})(props => <TempAccess {...props} />));
