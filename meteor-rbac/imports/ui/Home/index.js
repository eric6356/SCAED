import React from 'react';
import { Table, Icon, Tag } from 'antd';

const Home = () => {
    const render = hasAccess => {
        const type = { true: 'check', false: 'close' }[hasAccess];
        const color = { true: 'green', false: 'red' }[hasAccess];
        return type ? (
            <Tag color={color}>
                <Icon type={type} />
            </Tag>
        ) : (
            '...'
        );
    };

    const columns = [
        {
            title: 'Role',
            dataIndex: 'key',
            key: 'key'
        },
        {
            title: 'Home',
            dataIndex: 'Home',
            key: 'Home',
            render: (text, record) =>
                record.key === '...' ? (
                    '...'
                ) : (
                    <Tag color="green">
                        <Icon type="check" />
                    </Tag>
                )
        },
        {
            title: 'RBAC',
            dataIndex: 'RBAC',
            key: 'RBAC',
            render
        },
        {
            title: 'Jira',
            dataIndex: 'Jira',
            key: 'Jira',
            render
        },
        {
            title: 'Wiki',
            dataIndex: 'Wiki',
            key: 'Wiki',
            render
        },
        {
            title: '',
            dataIndex: 'others',
            key: 'others',
            render: (text, record) => (record.key === '...' ? '' : '...')
        }
    ];

    const dataSource = [
        { key: 'Super Admin', RBAC: true, Wiki: true, Jira: true },
        { key: 'Admin', RBAC: true, Wiki: false, Jira: false },
        { key: 'Developer', RBAC: false, Wiki: true, Jira: true },
        { key: 'Doc Writter', RBAC: false, Wiki: true, Jira: false },
        { key: '...' }
    ];

    return (
        <div>
            <h1>Home</h1>

            <h2>Access Table</h2>
            <Table dataSource={dataSource} columns={columns} />

            <h2>Hacky links</h2>
            <a href="/wiki">/wiki</a>
            <br />
            <a href="/jira">/jira</a>
            <br />
            <a href="/rbac/access">/rbac/access</a>
            <br />
            <a href="/rbac/role">/rbac/role</a>
            <br />
            <a href="/rbac/account">/rbac/account</a>
            <br />
            <a href="/rbac/tempAccess">/rbac/tempAccess</a>
        </div>
    );
};

export default Home;
