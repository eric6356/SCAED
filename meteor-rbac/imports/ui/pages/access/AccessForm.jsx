import React, { Component } from 'react';
import { Access } from 'meteor/accounts-base';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

export default class AccessForm extends Component {
    constructor({ access = null }) {
        super();
        this.accessID = access ? access._id : null;
        this.state = {
            msg: '',
            isSuccess: false,
            code: access ? access.code : '',
            endpoint: access ? access.endpoint : '',
            description: access ? access.description : ''
        };
    }

    handleSubmit() {
        const cb = (err, res) => {
            const msg = err ? err.reason : `Access ${this.accessID ? 'saved' : 'created'}!`;
            const isSuccess = !err;
            this.setState({ msg, isSuccess });
        };

        if (this.accessID) {
            Meteor.call('access.modify', { _id: this.accessID, params: this.state }, cb);
        } else {
            Meteor.call('access.create', { ...this.state }, cb);
        }

        return false;
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <form className="form">
                <div className="flex-left unit-gaps">
                    <label className="unit-0 test-right" style={{ width: '95px' }}>
                        Code:
                    </label>
                    <div className="unit">
                        <input type="text" value={this.state.code} onChange={e => this.handleChange(e)} name="code" />
                    </div>
                </div>
                <div className="flex-left unit-gaps">
                    <label className="unit-0 test-right" style={{ width: '95px' }}>
                        Endpoint:
                    </label>
                    <div className="unit">
                        <input
                            type="text"
                            value={this.state.endpoint}
                            onChange={e => this.handleChange(e)}
                            name="endpoint"
                        />
                    </div>
                </div>
                <div className="flex-left unit-gaps">
                    <label className="unit-0 test-right" style={{ width: '95px' }}>
                        Description:
                    </label>
                    <div className="unit">
                        <textarea
                            value={this.state.description}
                            onChange={e => this.handleChange(e)}
                            name="description"
                        />
                    </div>
                </div>
                <div className="flex-left unit-gaps">
                    <div style={{ width: '95px' }} />
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
