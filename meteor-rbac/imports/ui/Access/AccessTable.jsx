import React from 'react';
import { notification } from 'antd';

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
                    notification.success({ message: 'Success!', description: 'Access saved.' });
                } else {
                    notification.error({ message: 'Failed!', description: err.reason });
                }
                cb(err);
            })
        }
    />
);

export default AccessTable;
