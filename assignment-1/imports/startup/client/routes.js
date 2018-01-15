import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { ActiveRoute } from 'meteor/zimme:active-route';

ActiveRoute.configure({ activeClass: 'pure-menu-selected' });

BlazeLayout.setRoot('body');

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/account/account.js';
import '../../ui/pages/access/access.js';
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
makePrivateRouter('/account', 'account');
makePrivateRouter('/access', 'access');

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

Accounts.onLogin(() => {
    const next = FlowRouter.current().queryParams.next || '/';
    FlowRouter.go(next);
});
