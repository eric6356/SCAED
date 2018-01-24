import React from 'react';
import { message } from 'antd';

import * as c from '../../models/collections';

import { EditableTable, EditableMultipleOptionCell } from '../EditableTable';

class EditableAccessTable extends EditableTable {
    renderColumns(text, record, column) {
        if (column === 'menus') {
            return (
                <EditableMultipleOptionCell
                    editable={record.editable}
                    value={text}
                    onChange={value => this.handleChange(value, record.key, 'menus')}
                    options={c.AllMenus.concat(['All'])}
                />
            );
        } else {
            return super.renderColumns(text, record, column);
        }
    }
}

const AccessTable = props => (
    <EditableAccessTable
        items={props.accesses}
        columns={[
            { title: 'Code', dataIndex: 'code', width: '15%' },
            { title: 'Endpoint', dataIndex: 'endpoint', width: '15%' },
            { title: 'Menus', dataIndex: 'menus', width: '15%' },
            { title: 'Description', dataIndex: 'description', width: '30%' }
        ]}
        onSave={(access, cb) =>
            Meteor.call('access.modify', { _id: access._id, params: access }, err => {
                if (!err) {
                    message.success('Access saved!');
                } else {
                    message.error(err.reason);
                }
                cb(err);
            })
        }
    />
);

export default AccessTable;
