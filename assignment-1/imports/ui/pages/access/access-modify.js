import React from 'react';
import { render } from 'react-dom';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Mongo } from 'meteor/mongo';

import * as c from '../../../models/collections';
import './access-modify.html';
import AccessForm from './AccessForm.jsx';

Template.Access_Modify.onRendered(() => {
    const accessID = FlowRouter.getParam('_id');
    const access = c.Access.findOne(new Mongo.ObjectID(accessID));
    if (!access) {
        FlowRouter.go('404'); // TODO: 404
    }
    return render(<AccessForm access={access} />, document.getElementById('accessForm'));
});
