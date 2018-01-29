import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Spin } from 'antd';
import { Connect, SimpleSigner } from 'uport-connect';
import { Accounts } from 'meteor/accounts-base';

import UPort from './UPort';
import * as c from '../../models/collections';

const network = 'rinkeby';

export default (UPortContainer = withTracker(props => {
    const handle = Meteor.subscribe('uportConfig.all');
    const loading = !handle.ready();
    let uport;
    if (!loading) {
        const config = c.UPortConfig.findOne({ network });
        config.signer = SimpleSigner(config.signer);
        uport = new Connect('INFO7510', config);
    }
    return {
        loading,
        uport
    };
})(props => (
    <Spin spinning={props.loading}>
        <div style={{ width: '100vw', height: '100vh' }}>
            {Meteor.user() === null && <UPort {...props} />}
        </div>
    </Spin>
)));
