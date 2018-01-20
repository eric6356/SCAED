import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

export default class AccountForm extends Component {
    constructor({ account = null, allRoles }) {
        super();
        this.allRoles = allRoles;
        this.accountID = account ? account._id : null;
        this.state = {
            msg: '',
            isSuccess: false,
            username: account ? account.username : '',
            password: '',
            profile: account && account.profile ? account.profile : { roleIDs: [], personID: null }
        };
    }

    handleSubmit() {
        const cb = (err, res) => {
            const msg = err ? err.reason : `User ${this.accountID ? 'saved' : 'created'}!`;
            const isSuccess = !err;
            this.setState({ msg, isSuccess });
        };
        if (this.accountID) {
            Meteor.call('account.modify', { _id: this.accountID, params: this.state }, cb);
        } else {
            Meteor.call('account.create', { ...this.state }, cb);
        }
        return false;
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleChangeRole(e) {
        const roleIDs = [].slice.call(e.target.selectedOptions).map(one => one.value);
        this.setState({ profile: { ...this.state.profile, roleIDs } });
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
                            placeholder={this.accountID && 'leave this blank if not modified'}
                            type="password"
                            value={this.state.password}
                            onChange={e => this.handleChange(e)}
                            name="password"
                        />
                    </div>
                </div>
                <div className="flex-left unit-gaps">
                    <label className="unit-0 test-right" style={{ width: '85px' }}>
                        Roles:
                    </label>
                    <div className="unit">
                        <select
                            multiple={true}
                            value={this.state.profile.roleIDs}
                            onChange={e => this.handleChangeRole(e)}
                        >
                            {this.allRoles.map(role => (
                                <option value={role._id._str} key={role._id._str}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
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
