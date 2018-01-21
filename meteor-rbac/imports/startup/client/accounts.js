import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';

Accounts.onLogin(() => {
    const next = FlowRouter.current().queryParams.next || '/';
    FlowRouter.go(next);
});
