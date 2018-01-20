import { Template } from 'meteor/templating';

import * as c from '../../../models/collections';
import './access-table.html';
import './access-table-row';

Template.Access_Table.helpers({
    accessList() {
        return c.Access.find({});
    }
});
