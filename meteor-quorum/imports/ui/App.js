import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { Connect, SimpleSigner } from 'uport-connect'
import { clientId, network, signer } from '../uPortConfig.json'

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
    return Promise.resolve(
      JSON.parse(`{"@context":"http://schema.org","@type":"Person","publicKey":"0x041784b9e2e5defff579107cc648ced920a711771a31fe9c2e84da30d0826f8413bfbf0b8be6cd1362b7d57f8effbd4f89d773ffcf649529f7b589208985cf85be","publicEncKey":"zFEa00EXPtLe9UWCxYlM6cVARUqa10S0kS9GX4M0ryQ=","name":"eric6356","phone":"+18572897835","country":"US","pushToken":"eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJpc3MiOiIyb3BrclQyenc2WHdndFFHd0JXUDlmdjZ4U1FhcEFma2ZaWSIsImlhdCI6MTUyMjg3MjQ5NiwiYXVkIjoiMm9lWlRhUnRUaUNvbVhua0NQUW02SkRKVHRwZmdtNUp3akgiLCJ0eXBlIjoibm90aWZpY2F0aW9ucyIsInZhbHVlIjoiYXJuOmF3czpzbnM6dXMtd2VzdC0yOjExMzE5NjIxNjU1ODplbmRwb2ludC9BUE5TL3VQb3J0LzVmYWU5NGE4LWJiYTAtM2Y5OS05YzBhLWRhNjBlY2UyMWE5ZCIsImV4cCI6MTUyNDE2ODQ5Nn0.413N01qUCgYYW5RMsduFQQE2OzFP-oyrKoTCWVGITHSvfrw4cUS8qzffQDHNun5-SMK0o1FeHKJQ1Inh4EyFuw","address":"2opkrT2zw6XwgtQGwBWP9fv6xSQapAfkfZY","networkAddress":"2opkrT2zw6XwgtQGwBWP9fv6xSQapAfkfZY"}`)
    ).then(c => this.logInMeteor(c))
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
