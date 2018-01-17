import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

import './account-new.html';

Template.Account_New.events({
    submit(event) {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        Accounts.createUser({ username, password }, err => {
            if (err) {
                alert(err.message);
            } else {
                alert('success');
            }
        });
        return false;
    }
});
