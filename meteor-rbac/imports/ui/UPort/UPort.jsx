import React, { Component } from 'react'
import { Accounts } from 'meteor/accounts-base'

export default class UPort extends Component {
  showModal () {
    this.props.uport
      .requestCredentials({
        requested: ['name', 'phone', 'country', 'email'],
        notifications: true
      })
      .then(credentials => {
        Accounts.callLoginMethod({
          methodArguments: [{ uportCredentials: credentials }],
          userCallback: err => err && console.error(err)
        })
      })
      .catch(err => {
        console.error(err)
        this.showModal() // TODO
      })
  }

  render () {
    if (this.props.uport) {
      this.showModal()
    }
    return <div />
  }
}
