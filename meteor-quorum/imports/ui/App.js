import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { Connect, SimpleSigner } from 'uport-connect'
import { clientId, network, signer } from '../../uPortConfig.json'
import credentials from '../../uPortCredentials.json'

export default class App extends Component {
  constructor () {
    super()
    this.uport = new Connect('INFO7510', {
      clientId,
      network,
      signer: SimpleSigner(signer)
    })
    this.state = { credentials: null, account: null, value: 0, bank: 1, iContract: 1 }
  }

  handleBankChange (e) {
    this.setState({ bank: e.target.value })
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
    Meteor.call('accounts.signIn', { credentials, bank: this.state.bank }, (err, res) => {
      if (err) {
        console.error(err)
      } else {
        if (res) {
          this.setState({ account: res })
          this.getValue()
        } else {
          window.alert('invalid login')
        }
      }
    })
  }

  getValue () {
    Meteor.call('simpleStorage.get', this.state, (err, res) => {
      if (err) {
        console.error(err)
        window.alert('cannot get')
      } else {
        this.setState({ value: res })
      }
    })
  }

  setValue () {
    Meteor.call('simpleStorage.set', this.state, (err, res) => {
      if (err) {
        console.error(err)
        window.alert('cannot set')
      } else {
        console.log(res)
      }
    })
  }

  handleValueChange (e) {
    this.setState({ value: e.target.value })
  }

  handleContractChange (e) {
    this.setState({ iContract: e.target.value })
  }

  render () {
    return (
      <div>
        {!this.state.account &&
          <div className='login'>
            Bank:
          <select value={this.state.bank} onChange={e => this.handleBankChange(e)}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </select>
            <button onClick={() => this.logInUPort()}>LogIn with uPort</button>
            <button onClick={() => this.logInFake()}>Fake LogIn</button>
          </div>
        }
        <div className='profile' >
          {this.state.account && <dl>
            <b>Profile</b>
            <dt>Name</dt>
            <dd>{this.state.credentials.name}</dd>
            <dt>Phone</dt>
            <dd>{this.state.credentials.phone}</dd>
            <dt>Country</dt>
            <dd>{this.state.credentials.country}</dd>
            <dt>Bank</dt>
            <dd>{this.state.bank}</dd>
          </dl>}
        </div>
        <div className='simple-storage' >
          {this.state.account && <div>
            iContract:
            <select value={this.state.iContract} onChange={e => this.handleContractChange(e)}>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
            </select>
            <input type='number' value={this.state.value} onChange={e => this.handleValueChange(e)} />
            <button onClick={() => this.setValue()}>set</button>
            <button onClick={() => this.getValue()}>get</button>
          </div>}
        </div>
      </div>
    )
  }
}
