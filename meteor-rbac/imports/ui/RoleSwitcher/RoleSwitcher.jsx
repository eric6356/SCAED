import React, { Component } from 'react';
import { Menu, Dropdown, Icon, message } from 'antd';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default class RoleSwitcher extends Component {
    handleClick({ key }) {
        const role = this.props.roles[key];
        Session.set('currentRoleID', role._id);
        message.info(`Switched to role ${role.name}`);
        FlowRouter.go('/');
    }
    render() {
        const { currentRoleID } = this.props;
        const currentRole = this.props.roles.filter(role => {
            return role._id.equals(currentRoleID);
        })[0];
        return (
            <Dropdown
                overlay={
                    <Menu onClick={e => this.handleClick(e)}>
                        {this.props.roles.map((role, i) => (
                            <Menu.Item key={i}>{role.name}</Menu.Item>
                        ))}
                    </Menu>
                }
            >
                <a>
                    {currentRole && currentRole.name}
                    <Icon type="down" />
                </a>
            </Dropdown>
        );
    }
}
