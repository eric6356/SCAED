import React from 'react';
import { render } from 'react-dom';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Mongo } from 'meteor/mongo';

import * as c from '../../../models/collections';
import './account-modify.html';
import AccountForm from './AccountForm';

Template.Account_Modify.onRendered(() => {
    const props = { allRoles: c.Role.find({}) };
    const accountID = FlowRouter.getParam('_id');
    props.account = c.Account.findOne(accountID);
    if (!props.account) {
        FlowRouter.go('404'); // TODO: 404
    }

    render(<AccountForm {...props} />, document.getElementById('accountForm'));
});
