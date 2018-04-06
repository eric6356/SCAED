import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { Connect, SimpleSigner } from 'uport-connect'
import { clientId, network, signer } from './uPortConfig.json'
import credentials from './uPortCredentials.json'

export default class App extends Component {
  constructor () {
    super()
    this.uport = new Connect('INFO7510', {
      clientId,
      network,
      signer: SimpleSigner(signer)
    })
    this.state = { credentials: null, account: null }
  }

  logInUPort () {
    return this.uport.requestCredentials({
      requested: ['name', 'phone', 'country'],
      notifications: true // We want this if we want to recieve credentials
    }).then(c => this.logInMeteor(c))
  }

  logInFake () {
    return Promise.resolve(credentials).then(c => this.logInMeteor(c))
  }

  logInMeteor (credentials) {
    this.setState({ credentials })
    Meteor.call('accounts.signIn', this.state.credentials, (err, res) => {
      if (err) {
        console.error(err)
      } else {
        this.setState({ account: res })
      }
    })
  }

  render () {
    return (
      <div>
        <div className='action'>
          <button onClick={() => this.logInUPort()}>LogIn with uPort</button>
          <button onClick={() => this.logInFake()}>Fake LogIn</button>
        </div>
        <div className='profile' >
          {this.state.credentials && <dl>
            <b>Profile</b>
            <dt>Name</dt>
            <dd>{this.state.credentials.name}</dd>
            <dt>Phone</dt>
            <dd>{this.state.credentials.phone}</dd>
            <dt>Country</dt>
            <dd>{this.state.credentials.country}</dd>
          </dl>}
          {this.state.account && <dl>
            <dt>Role</dt>
            <dd>{this.state.account.role}</dd>
          </dl>}
        </div>
      </div>
    )
  }
}
