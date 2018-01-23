import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Spin } from 'antd';
import { FlowRouter } from 'meteor/kadira:flow-router';

import Profile from './Profile.jsx';
import * as c from '../../models/collections';

export default (ProfileContainer = withTracker(props => {
    Meteor.subscribe('account.all');
    Meteor.subscribe('contact.all');
    Meteor.subscribe('jobProfile.all');
    const id = FlowRouter.getParam('_id');
    const account = c.Account.findOne(id);
    return {
        account,
        contact: account.getContact(),
        jobProfile: account.getJobProfile()
    };
})(props => <Profile {...props} />));
