import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import LayoutContainer from '../../ui/Layout';
import Home from '../../ui/Home';
import Portal from '../../ui/Portal';
import Access from '../../ui/Access';
import Role from '../../ui/Role';
import Account from '../../ui/Account';
import Profile from '../../ui/Profile';

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
makePrivateRouter('/rbac/access', 'Access', <Access />);
makePrivateRouter('/rbac/role', 'Role', <Role />);
makePrivateRouter('/rbac/account', 'Account', <Account />);
makePrivateRouter('/rbac/account/:_id', 'Profile', <Profile />);

FlowRouter.route('/portal', {
    name: 'Portal',
    action: () => mount(Portal)
});

FlowRouter.route('/logout', {
    name: 'Logout',
    action: () => Meteor.logout(() => FlowRouter.go('/portal'))
});
