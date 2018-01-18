import React from 'react';
import { render } from 'react-dom';
import { Template } from 'meteor/templating';

import './account-new.html';
import AccountForm from './AccountForm';

Template.Account_New.onRendered(() => render(<AccountForm />, document.getElementById('accountForm')));
