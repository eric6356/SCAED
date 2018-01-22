import { withTracker } from 'meteor/react-meteor-data';

import Layout from './Layout.jsx';

export default (LayoutContainer = withTracker(props => ({
    user: Meteor.user(),
    menus: ['Home', 'Access', 'Role']
}))(Layout));
