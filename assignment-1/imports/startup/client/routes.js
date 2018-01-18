import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { ActiveRoute } from 'meteor/zimme:active-route';

BlazeLayout.setRoot('body');

// Import needed templates
import '../../ui/layout/layout.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/account';
import '../../ui/pages/access';
import '../../ui/pages/portal/portal.js';

// Set up all routes in the app
function makePrivateRouter(path, name) {
    FlowRouter.route(path, {
        name,
        triggersEnter: function(context, redirect) {
            if (Meteor.user()) {
                BlazeLayout.render('App_body', { main: name });
            } else {
                redirect(`/portal?next=${encodeURIComponent(path)}`);
            }
        }
    });
}

makePrivateRouter('/', 'home');

makePrivateRouter('/account/list', 'Account_List');
makePrivateRouter('/account/new', 'Account_New');
makePrivateRouter('/account/:_id', 'Account_Modify');

makePrivateRouter('/access/list', 'Access_List');
makePrivateRouter('/access/new', 'Access_New');
makePrivateRouter('/access/:_id', 'Access_Modify');

makePrivateRouter('/role/list', 'Role_List');
makePrivateRouter('/role/new', 'Role_New');
makePrivateRouter('/rold/:_id', 'Role_Modify');

FlowRouter.route('/portal', {
    name: 'portal',
    action() {
        BlazeLayout.render('App_body', { main: 'portal' });
    }
});

FlowRouter.route('/logout', {
    name: 'logout',
    action() {
        Meteor.logout(() => FlowRouter.go('/portal'));
    }
});

// FlowRouter.notFound = {
//     action() {
//         BlazeLayout.render('App_body', { main: 'App_notFound' });
//     }
// };
