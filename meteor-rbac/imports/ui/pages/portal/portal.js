import React from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';

import './portal.html';
import Portal from '../../components/Portal';

Template.Portal.onRendered(() => {
    ReactDOM.render(<Portal />, document.getElementById('Portal'));
});
