import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

import Layout from './Layout.jsx';

Tracker.autorun(() => {
    Meteor.call('role.menus', { _id: Session.get('currentRoleID') }, (err, res) => {
        Session.set('roleMenus', res);
    });
});

export default (LayoutContainer = withTracker(props => {
    const menus = {};
    (Session.get('roleMenus') || []).forEach(menu => (menus[menu] = true));
    (Session.get('tempMenus') || []).forEach(menu => (menus[menu] = true));
    return {
        user: Meteor.user(),
        menus: menus['All'] ? c.AllMenus : Object.keys(menus)
    };
})(Layout));
