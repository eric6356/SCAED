import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import { Session } from 'meteor/session';
import minimatch from 'minimatch';

import LayoutContainer from '../../ui/Layout';
import Home from '../../ui/Home';
import Portal from '../../ui/Portal';
import Access from '../../ui/Access';
import Role from '../../ui/Role';
import Account from '../../ui/Account';
import Profile from '../../ui/Profile';
import * as c from '../../models/collections';

function makePrivateRouter(path, name, container) {
    FlowRouter.route(path, {
        name,
        triggersEnter: function(context, redirect) {
            if (Meteor.user()) {
                const currentRoleID = Session.get('currentRoleID');
                Meteor.call('role.canAccess', { _id: currentRoleID, path }, (err, res) => {
                    if (res) {
                        mount(LayoutContainer, { main: container });
                    } else {
                        FlowRouter.go('/404');
                    }
                });
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
    action: () => {
        Session.set('currentRoleID', null);
        Meteor.logout(() => FlowRouter.go('/portal'));
    }
});

FlowRouter.notfound = {
    action: () => mount(LayoutContainer, { main: <h1>{FlowRouter.current().path}</h1> })
};
