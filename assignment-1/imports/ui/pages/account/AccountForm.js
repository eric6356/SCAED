import React, { Component } from 'react';
import { render } from 'react-dom';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

export default class AccountForm extends Component {
    constructor() {
        super();
        this.state = {
            msg: '',
            isSuccess: false,
            username: '',
            password: ''
        };
    }

    handleSubmit() {
        Meteor.call('accounts.create', { ...this.state }, (err, res) => {
            const msg = err ? err.reason : 'User created!';
            const isSuccess = !err;
            this.setState({ msg, isSuccess });
        });
        return false;
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <form className="form">
                <div className="flex-left unit-gaps">
                    <label className="unit-0 test-right" style={{ width: '85px' }}>
                        Username:
                    </label>
                    <div className="unit">
                        <input
                            type="text"
                            value={this.state.username}
                            onChange={e => this.handleChange(e)}
                            name="username"
                        />
                    </div>
                </div>
                <div className="flex-left unit-gaps">
                    <label className="unit-0 test-right" style={{ width: '85px' }}>
                        Password:
                    </label>
                    <div className="unit">
                        <input
                            type="password"
                            value={this.state.password}
                            onChange={e => this.handleChange(e)}
                            name="password"
                        />
                    </div>
                </div>
                <div className="flex-left unit-gaps">
                    <div style={{ width: '85px' }} />
                    <div>
                        {this.state.msg && (
                            <p className={`text-${this.state.isSuccess ? 'success' : 'danger'} top-gap-0`}>
                                {this.state.msg}
                            </p>
                        )}
                        <button className="btn btn-primary" type="button" onClick={() => this.handleSubmit()}>
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
