import React from 'react';
import { render } from 'react-dom';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Mongo } from 'meteor/mongo';

import * as c from '../../../models/collections';
import './role-new.html';
import RoleForm from './RoleForm.jsx';

Template.Role_New.onRendered(() => {
    allAccesses = c.Access.find({});
    return render(<RoleForm allAccesses={allAccesses} />, document.getElementById('roleForm'));
});
