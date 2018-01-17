import { Template } from 'meteor/templating';

import * as c from '../../../models/collections';
import './account-table.html';
import './account-table-row';

Template.Account_Table.helpers({
    accountList() {
        return c.Account.find({});
    }
});
