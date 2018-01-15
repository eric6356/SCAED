import { Template } from 'meteor/templating';
import { ActiveRoute } from 'meteor/zimme:active-route';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './body.html';

Template.App_body.helpers({
    activeListClass(list) {
        const active = ActiveRoute.name('Lists.show') && FlowRouter.getParam('_id') === list._id;
        return active && 'active';
    }
});
