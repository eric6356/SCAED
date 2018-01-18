import React, { Component } from 'react';

export default class RoleForm extends Component {
    constructor({ role = null, allAccesses }) {
        super();
        this.roleID = role ? role._id : null;
        this.allAccesses = allAccesses;
        this.state = {
            msg: '',
            isSuccess: false,
            name: role ? role.name : '',
            accessIDs: role ? role.accessIDs : []
        };
    }

    handleSubmit() {
        const cb = (err, res) => {
            const msg = err ? err.reason : `Role ${this.roleID ? 'saved' : 'created'}!`;
            const isSuccess = !err;
            this.setState({ msg, isSuccess });
        };

        if (this.roleID) {
            Meteor.call('role.modify', { _id: this.roleID, params: this.state }, cb);
        } else {
            Meteor.call('role.create', { ...this.state }, cb);
        }

        return false;
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleChangeMultiple(e) {
        const values = [].slice.call(e.target.selectedOptions).map(one => one.value);
        this.setState({ [e.target.name]: values });
    }

    render() {
        return (
            <form className="form">
                <div className="flex-left unit-gaps">
                    <label className="unit-0 test-right" style={{ width: '95px' }}>
                        Name:
                    </label>
                    <div className="unit">
                        <input type="text" value={this.state.name} onChange={e => this.handleChange(e)} name="name" />
                    </div>
                </div>
                <div className="flex-left unit-gaps">
                    <label className="unit-0 test-right" style={{ width: '95px' }}>
                        Accesses:
                    </label>
                    <div className="unit">
                        <select
                            name="accessIDs"
                            multiple={true}
                            value={this.state.accessIDs}
                            onChange={e => this.handleChangeMultiple(e)}
                        >
                            {this.allAccesses.map(access => (
                                <option value={access._id._str} key={access.code}>
                                    {access.code}
                                </option>
                            ))}
                        </select>
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
