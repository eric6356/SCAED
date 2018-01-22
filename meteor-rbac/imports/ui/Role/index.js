import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Spin } from 'antd';

import Access from './Role.jsx';
import * as c from '../../models/collections';

export default (AccessContainer = withTracker(props => {
    const accessHandle = Meteor.subscribe('access.all');
    const roleHandle = Meteor.subscribe('role.all');
    const loading = !roleHandle.ready() && !accessHandle.ready();
    return {
        loading,
        roles: !loading ? c.Role.find().fetch() : [],
        accesses: !loading ? c.Access.find().fetch() : []
    };
})(props => (
    <Spin spinning={props.loading}>
        <Role {...props} />
    </Spin>
)));
