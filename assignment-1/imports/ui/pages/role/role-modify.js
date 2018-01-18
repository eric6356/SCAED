import React from 'react';
import { render } from 'react-dom';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Mongo } from 'meteor/mongo';

import * as c from '../../../models/collections';
import './role-modify.html';
import RoleForm from './RoleForm.jsx';

Template.Role_Modify.onRendered(() => {
    const roleID = FlowRouter.getParam('_id');
    const props = {
        role: c.Role.findOne(new Mongo.ObjectID(roleID))
    };
    if (!props.role) {
        FlowRouter.go('404'); // TODO: 404
    }
    props.allAccesses = c.Access.find({});
    return render(<RoleForm {...props} />, document.getElementById('roleForm'));
});
