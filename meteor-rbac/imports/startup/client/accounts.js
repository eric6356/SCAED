import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';

// import { AccountsTemplates } from 'meteor/useraccounts:core';

// AccountsTemplates.avoidRedirect = true;

Accounts.onLogin(() => {
    const next = FlowRouter.current().queryParams.next || '/';
    FlowRouter.go(next);
});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});

// Accounts.config({
//     forbidClientAccountCreation: false
// });
