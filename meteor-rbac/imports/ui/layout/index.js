import { withTracker } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import Layout from './Layout.jsx';

Tracker.autorun(() => {
    Meteor.call('role.menus', { _id: Session.get('currentRoleID') }, (err, res) => {
        Session.set('menus', res);
    });
});

export default (LayoutContainer = withTracker(props => ({
    user: Meteor.user(),
    menus: Session.get('menus')
}))(Layout));
