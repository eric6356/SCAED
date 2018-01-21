import { withTracker } from 'meteor/react-meteor-data';

import Layout from './Layout.jsx';

export default (LayoutContainer = withTracker(props => {
    // props here will have `main`, passed from the router
    // anything we return from this function will be *added* to it
    return {
        user: Meteor.user(),
        menus: [{ name: 'Home' }]
    };
})(Layout));
