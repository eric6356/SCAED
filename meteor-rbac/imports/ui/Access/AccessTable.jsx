import React from 'react';
import { message } from 'antd';

import { EditableTable } from '../EditableTable';

const AccessTable = props => (
    <EditableTable
        items={props.accesses}
        columns={[
            { title: 'Code', dataIndex: 'code', width: '20%' },
            { title: 'Endpoint', dataIndex: 'endpoint', width: '20%' },
            { title: 'Description', dataIndex: 'description', width: '40%' }
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
