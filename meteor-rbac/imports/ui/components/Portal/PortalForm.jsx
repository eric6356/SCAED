import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Form, Icon, Input, Button, Spin } from 'antd';
const FormItem = Form.Item;

import './index.css';

export default class PortalForm extends React.Component {
    constructor() {
        super();
        this.state = {
            loggingIn: false
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({ loggingIn: true });
                Meteor.loginWithPassword({ username: values.username }, values.password, err => {
                    this.setState({ loggingIn: false });
                    if (!err) {
                        return;
                    }
                    const fieldName = err.reason == 'User not found' ? 'username' : 'password';
                    this.props.form.setFields({
                        [fieldName]: {
                            value: values[fieldName],
                            errors: [err]
                        }
                    });
                });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Spin tip="Logging in..." spinning={this.state.loggingIn}>
                <div className="form-wrapper">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }]
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }]
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </Spin>
        );
    }
}
