import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import RoleSwitcher from './RoleSwitcher.jsx';
import * as c from '../../models/collections';

export default (RoleSwitcherContainer = withTracker(props => {
    Meteor.subscribe('role.all');
    const _id = Meteor.userId();
    const currentRoleID = Session.get('currentRoleID');
    return {
        currentRoleID,
        roles: _id
            ? c.Account.findOne(_id)
                  .getRoles()
                  .fetch()
            : []
    };
})(props => <RoleSwitcher {...props} />));
