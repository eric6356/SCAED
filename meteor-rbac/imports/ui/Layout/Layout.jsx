import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Layout as AntdLayout, Menu } from 'antd';

const { Content, Sider, Header } = AntdLayout;

const Layout = ({ main, menus, user }) => (
    <AntdLayout>
        <Sider style={{ minHeight: '100vh', paddingTop: '16px' }}>
            <Menu theme="dark" onClick={({ key }) => FlowRouter.go(key)}>
                {menus.map(one => <Menu.Item key={one}>{one}</Menu.Item>)}
            </Menu>
        </Sider>
        <AntdLayout>
            {user && (
                <Header
                    style={{
                        backgroundColor: 'white',
                        height: '20px',
                        lineHeight: '20px',
                        textAlign: 'right',
                        paddingRight: '20px'
                    }}
                >
                    <a onClick={() => FlowRouter.go('/logout')}>Logout</a>
                </Header>
            )}
            <Content style={{ margin: '20px' }}>{main}</Content>
        </AntdLayout>
    </AntdLayout>
);
export default Layout;
