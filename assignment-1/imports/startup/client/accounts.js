import { Accounts } from 'meteor/accounts-base';

Accounts.onLogin(() => {
    const next = FlowRouter.current().queryParams.next || '/';
    FlowRouter.go(next);
});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});
