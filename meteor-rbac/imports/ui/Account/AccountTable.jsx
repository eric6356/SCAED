import React from 'react';
import { message } from 'antd';
import { FlowRouter } from 'meteor/kadira:flow-router';

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
            {
                title: 'Profile',
                dataIndex: 'profile',
                width: '20%',
                render: (text, record) => (
                    <a onClick={() => FlowRouter.go(`/rbac/account/${record.key}`)}>View</a>
                )
            },
            { title: 'Username', dataIndex: 'username', width: '20%' },
            { title: 'Role', dataIndex: 'profile.roleIDs', width: '40%' }
        ]}
        onSave={(account, cb) =>
            Meteor.call('account.modify', { _id: account._id, params: account }, err => {
                if (!err) {
                    message.success('Account saved');
                } else {
                    message.error(err.reason);
                }
                cb(err);
            })
        }
    />
);

export default AccountTable;
