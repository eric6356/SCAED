import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Template } from 'meteor/templating';

import './access-new.html';
import AccessFrom from './AccessForm';

Template.Access_New.onRendered(() => render(<AccessFrom />, document.getElementById('accessForm')));
