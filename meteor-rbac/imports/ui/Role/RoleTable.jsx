import React from 'react';
import { notification } from 'antd';

import { ensureString } from '../../api/utils';
import { EditableTable, EditableCell, EditableMultipleOptionCell } from '../EditableTable';

class EditableRoleTable extends EditableTable {
    renderColumns(text, record, column) {
        if (column == 'accessIDs') {
            return (
                <EditableMultipleOptionCell
                    editable={record.editable}
                    value={text}
                    onChange={value => this.handleChange(value, record.key, 'accessIDs')}
                    options={this.props.accesses}
                    displayKey="code"
                />
            );
        } else {
            return super.renderColumns(text, record, column);
        }
    }
}

const RoleTable = props => (
    <EditableRoleTable
        accesses={props.accesses}
        items={props.roles.map(role => ({ ...role, accessIDs: ensureString(role.accessIDs) }))}
        columns={[
            { title: 'Role Name', dataIndex: 'name', width: '20%' },
            { title: 'Access', dataIndex: 'accessIDs', width: '60%' }
        ]}
        onSave={(role, cb) =>
            Meteor.call('role.modify', { _id: role._id, params: role }, err => {
                if (!err) {
                    notification.success({ message: 'Success!', description: 'Role saved.' });
                } else {
                    notification.error({ message: 'Failed!', description: err.reason });
                }
                cb(err);
            })
        }
    />
);

export default RoleTable;
