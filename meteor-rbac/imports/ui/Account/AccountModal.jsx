import React, { Component } from 'react';
import { Modal, Button, Icon, Form, Input, notification, Select } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;

import { getStringID } from '../../api/utils';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 }
    }
};

class AccountFormComponent extends Component {
    state = { isSubmitting: false };
    handleSubmit(e) {
        this.setState({ isSubmitting: true });
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const params = {
                    username: values.username,
                    password: values.password,
                    profile: { roleIDs: values.roleIDs }
                };
                Meteor.call('account.create', { ...params }, err => {
                    this.setState({ isSubmitting: false });
                    if (!err) {
                        this.props.form.setFields({
                            username: { value: '' },
                            password: { value: '' },
                            roleIDs: { value: [] }
                        });
                        notification.success({
                            message: 'Created!',
                            description: 'Account created.'
                        });
                    } else {
                        notification.error({
                            message: 'Failed!',
                            description: err.reason
                        });
                    }
                });
            }
        });
        return false;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={e => this.handleSubmit(e)}>
                <FormItem {...formItemLayout} label="Username">
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input username.',
                                whitespace: true
                            }
                        ]
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Password">
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input password' }]
                    })(<Input type="password" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Role">
                    {getFieldDecorator('roleIDs', {
                        rules: [
                            {
                                required: true,
                                message: 'Please select role.',
                                type: 'array'
                            }
                        ]
                    })(
                        <Select mode="multiple" placeholder="Please select roles">
                            {this.props.roles.map(role => (
                                <Option key={getStringID(role)}>{role.name}</Option>
                            ))}
                        </Select>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const AccountForm = Form.create()(AccountFormComponent);

export default class AccountModal extends Component {
    state = { visible: false };
    render() {
        return (
            <div>
                <Button type="primary" onClick={() => this.setState({ visible: true })}>
                    <Icon type="plus" />
                    New Account
                </Button>
                <Modal
                    title="New Role"
                    width={600}
                    visible={this.state.visible}
                    onCancel={() => this.setState({ visible: false })}
                    footer={null}
                >
                    <AccountForm roles={this.props.roles} />
                </Modal>
            </div>
        );
    }
}
