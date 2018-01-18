import React from 'react';
import { render } from 'react-dom';
import { Template } from 'meteor/templating';

import * as c from '../../../models/collections';
import './account-new.html';
import AccountForm from './AccountForm';

Template.Account_New.onRendered(() => {
    const allRoles = c.Role.find({});
    render(<AccountForm allRoles={allRoles} />, document.getElementById('accountForm'));
});
