import React, { Component } from 'react'
import { Modal } from 'antd'
import { Accounts } from 'meteor/accounts-base'
import MNID from 'mnid'

import { contract, accounts } from '../../api'

const confirm = Modal.confirm

export default class UPort extends Component {
  render () {
    !this.props.loading && contract.uport
      .requestCredentials({
        requested: ['name', 'phone', 'country', 'email'],
        notifications: true
      })
      .then(credentials => {
        const address = MNID.decode(credentials.address).address
        accounts.getAccount(address)
          .then(result => {
            if (result) {
              login(credentials)
            } else {
              confirm({
                title: 'Register Confirm',
                content: 'No account found. Do you want to call the contract to register?',
                onOk () {
                  accounts.register(address).then(() => login(credentials))
                },
                onCancel () { }
              })
            }
          })
      })
      .catch(err => {
        throw err
      })
    return <div />
  }
}

const login = credentials => Accounts.callLoginMethod({
  methodArguments: [{ uportCredentials: credentials }],
  userCallback: err => err && console.error(err)
})
