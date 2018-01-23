import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import RoleSwitcher from './RoleSwitcher.jsx';
import * as c from '../../models/collections';

export default (RoleSwitcherContainer = withTracker(props => {
    Meteor.subscribe('role.all');
    const id = Meteor.user() && Meteor.user()._id;
    const currentRoleID = Session.get('currentRoleID');
    return {
        currentRoleID,
        roles: c.Account.findOne(id)
            .getRoles()
            .fetch()
    };
})(props => <RoleSwitcher {...props} />));
