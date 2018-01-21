import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import LayoutContainer from '../../ui/Layout';
import Home from '../../ui/Home';
import Portal from '../../ui/Portal';

function makePrivateRouter(path, name, container) {
    FlowRouter.route(path, {
        name,
        triggersEnter: function(context, redirect) {
            if (Meteor.user()) {
                mount(LayoutContainer, { main: container });
            } else {
                redirect(`/portal?next=${encodeURIComponent(path)}`);
            }
        }
    });
}

makePrivateRouter('/', 'Home', <Home />);

FlowRouter.route('/portal', {
    name: 'Portal',
    action: () => mount(Portal)
});

FlowRouter.route('/logout', {
    name: 'Logout',
    action: () => Meteor.logout(() => FlowRouter.go('/portal'))
});
