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

// Set up all routes in the app
FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('App_body', { main: 'home' });
    }
});

FlowRouter.route('/account', {
    name: 'account',
    action() {
        BlazeLayout.render('App_body', { main: 'account' });
    }
});

FlowRouter.route('/access', {
    name: 'access',
    action() {
        BlazeLayout.render('App_body', { main: 'access' });
    }
});

// FlowRouter.notFound = {
//     action() {
//         BlazeLayout.render('App_body', { main: 'App_notFound' });
//     }
// };
