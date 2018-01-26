import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

import Layout from './Layout.jsx';

Tracker.autorun(() => {
    Meteor.call('role.menus', { _id: Session.get('currentRoleID') }, (err, res) => {
        FlowRouter.reload();
        Session.setAuth('roleMenus', res);
    });
});

export default (LayoutContainer = withTracker(props => {
    const menusMap = {};
    (Session.get('roleMenus') || []).forEach(menu => (menusMap[menu] = true));
    (Session.get('tempMenus') || []).forEach(menu => (menusMap[menu] = true));
    const menus = menusMap['All'] ? c.AllMenus : Object.keys(menusMap);
    menus.sort();
    return {
        user: Meteor.user(),
        menus
    };
})(Layout));
