import React from 'react';
import { notification } from 'antd';

import { ensureString } from '../../api/utils';
import { EditableTable, EditableMultipleOptionCell } from '../EditableTable';

class EditableAccountTable extends EditableTable {
    renderColumns(text, record, column) {
        if (column == 'profile.roleIDs') {
            return (
                <EditableMultipleOptionCell
                    editable={record.editable}
                    value={text}
                    onChange={value => this.handleChange(value, record.key, 'profile.roleIDs')}
                    options={this.props.roles}
                    displayKey="name"
                />
            );
        } else {
            return super.renderColumns(text, record, column);
        }
    }
}

const AccountTable = props => (
    <EditableAccountTable
        roles={props.roles}
        items={props.accounts.map(account => ({
            ...account,
            profile: { ...account.profile, roleIDs: ensureString(account.profile.roleIDs) }
        }))}
        columns={[
            { title: 'Username', dataIndex: 'username', width: '20%' },
            { title: 'Role', dataIndex: 'profile.roleIDs', width: '60%' }
        ]}
        onSave={(account, cb) =>
            Meteor.call('account.modify', { _id: account._id, params: account }, err => {
                if (!err) {
                    notification.success({ message: 'Success!', description: 'Account saved.' });
                } else {
                    notification.error({ message: 'Failed!', description: err.reason });
                }
                cb(err);
            })
        }
    />
);

export default AccountTable;
