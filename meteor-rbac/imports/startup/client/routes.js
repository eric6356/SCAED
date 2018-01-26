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
import TempAccess from '../../ui/TempAccess';

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
                        Meteor.call(
                            'account.canTempAccess',
                            { _id: Meteor.userId(), path },
                            (err, res) => {
                                if (res) {
                                    mount(LayoutContainer, { main: container });
                                } else {
                                    FlowRouter.go('/404');
                                }
                            }
                        );
                    }
                });
            } else {
                redirect(`/portal/?next=${encodeURIComponent(path)}`);
            }
        }
    });
}

makePrivateRouter('/', 'Home', <Home />);
makePrivateRouter('/rbac/access', 'Access', <Access />);
makePrivateRouter('/rbac/role', 'Role', <Role />);
makePrivateRouter('/rbac/account', 'Account', <Account />);
makePrivateRouter('/rbac/account/:_id', 'Profile', <Profile />);
makePrivateRouter('/rbac/tempAccess', 'Temp Access', <TempAccess />);
makePrivateRouter('/wiki', 'Wiki', <h1>Wiki</h1>);
makePrivateRouter('/jira', 'Jira', <h1>Jira</h1>);
makePrivateRouter('/sharepoint', 'SharePoint', <h1>SharePoint</h1>);

FlowRouter.route('/portal', {
    name: 'Portal',
    action: () => mount(Portal)
});

FlowRouter.route('/logout', {
    name: 'Logout',
    action: () => {
        Meteor.logout(() => FlowRouter.go('/portal/'));
    }
});

FlowRouter.notfound = {
    action: () => mount(LayoutContainer, { main: <h1>Not Found</h1> })
};
