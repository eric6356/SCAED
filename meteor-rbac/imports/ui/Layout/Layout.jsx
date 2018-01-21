import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Layout as AntdLayout, Menu } from 'antd';

const { Content, Sider, Header } = AntdLayout;

const Layout = ({ main, menus, user }) => (
    <AntdLayout>
        <Sider style={{ paddingTop: '16px' }} style={{ minHeight: '100vh' }}>
            {menus.map((one, i) => (
                <Menu key={i} theme="dark" onClick={({ key }) => FlowRouter.go(key)}>
                    <Menu.Item key={one.name}>{one.name}</Menu.Item>
                </Menu>
            ))}
        </Sider>
        <AntdLayout>
            {user && (
                <Header style={{ backgroundColor: 'white', height: '20px', lineHeight: '20px', textAlign: 'right' }}>
                    <a onClick={() => FlowRouter.go('/logout')}>Logout</a>
                </Header>
            )}
            <Content>{main}</Content>
        </AntdLayout>
    </AntdLayout>
);
export default Layout;
