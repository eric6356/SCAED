import { Template } from 'meteor/templating';

import './layout.html';
import '../components/aside-menu-group';

Template.App_body.helpers({
    menuGroups: () => [
        {
            title: 'Account',
            allName: 'Account_List',
            allText: 'All Accounts',
            newName: 'Account_New',
            newText: 'Create Account'
        },
        {
            title: 'Access',
            allName: 'Access_List',
            allText: 'All Accesses',
            newName: 'Access_New',
            newText: 'Create Access'
        },
        {
            title: 'Role',
            allName: 'Role_List',
            allText: 'All Roles',
            newName: 'Role_New',
            newText: 'Create Role'
        }
    ]
});
