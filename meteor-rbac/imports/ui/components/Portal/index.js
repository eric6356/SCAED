import React from 'react';
import { Row, Col, Form } from 'antd';

import PortalForm from './PortalForm';

const WrappedPortalForm = Form.create()(PortalForm);

const Portal = () => <WrappedPortalForm />;

export default Portal;
