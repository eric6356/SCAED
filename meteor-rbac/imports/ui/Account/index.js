import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Spin } from 'antd';

import Account from './Account.jsx';
import * as c from '../../models/collections';

export default (AccountContainer = withTracker(props => {
    const accountHandle = Meteor.subscribe('account.all');
    const roleHandle = Meteor.subscribe('role.all');
    const loading = !roleHandle.ready() && !accountHandle.ready();
    return {
        loading,
        roles: !loading ? c.Role.find().fetch() : [],
        accounts: !loading ? c.Account.find().fetch() : []
    };
})(props => (
    <Spin spinning={props.loading}>
        <Account {...props} />
    </Spin>
)));
