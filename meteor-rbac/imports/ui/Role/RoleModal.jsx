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

class RoleFormComponent extends Component {
    state = { isSubmitting: false };
    handleSubmit(e) {
        this.setState({ isSubmitting: true });
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                Meteor.call('role.create', { ...values }, err => {
                    this.setState({ isSubmitting: false });
                    if (!err) {
                        this.props.form.setFields({
<<<<<<< HEAD
                            name: { value: '' },
                            accessIDs: { value: [] }
=======
                            code: { value: '' },
                            endpoint: { value: '' },
                            description: { value: '' }
>>>>>>> 79bafd0574bf853bb6a14de3c8567e9714892234
                        });
                        notification.success({
                            message: 'Created!',
                            description: 'Role created.'
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
                <FormItem {...formItemLayout} label="Role Name">
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input role name.',
                                whitespace: true
                            }
                        ]
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Accesses">
                    {getFieldDecorator('accessIDs', {
                        rules: [
                            {
                                required: true,
                                message: 'Please select Access.',
                                type: 'array'
                            }
                        ]
                    })(
                        <Select mode="multiple" placeholder="Please select accesses">
                            {this.props.accesses.map(access => (
                                <Option key={getStringID(access)}>{access.code}</Option>
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

const RoleForm = Form.create()(RoleFormComponent);

export default class RoleModal extends Component {
    state = { visible: false };
    render() {
        return (
            <div>
                <Button type="primary" onClick={() => this.setState({ visible: true })}>
                    <Icon type="plus" />
                    New Role
                </Button>
                <Modal
                    title="New Role"
                    width={600}
                    visible={this.state.visible}
                    onCancel={() => this.setState({ visible: false })}
                    footer={null}
                >
                    <RoleForm accesses={this.props.accesses} />
                </Modal>
            </div>
        );
    }
}
