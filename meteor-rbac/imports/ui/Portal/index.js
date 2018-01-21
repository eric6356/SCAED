import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Form } from 'antd';

import PortalForm from './PortalForm';

export default (Portal = Form.create()(PortalForm));
