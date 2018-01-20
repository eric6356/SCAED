import { Template } from 'meteor/templating';

import * as c from '../../../models/collections';
import './role-table.html';
import './role-table-row';

Template.Role_Table.helpers({
    roleList() {
        return c.Role.find({});
    }
});
