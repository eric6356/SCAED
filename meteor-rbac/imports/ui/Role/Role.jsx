import React from 'react';
import { Row, Col } from 'antd';

import RoleTable from './RoleTable';
import RoleModal from './RoleModal';

export default (Role = props => {
    return (
        <div>
            <Row type="flex" justify="space-between" align="buttom">
                <Col>
                    <h1>Manage Role</h1>
                </Col>
                <Col>
                    <RoleModal />
                </Col>
            </Row>

            <RoleTable {...props} />
        </div>
    );
});
