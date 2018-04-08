import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

export const Accounts = new Mongo.Collection('accounts')

Meteor.methods({
  'accounts.signIn' ({ credentials, bank }) {
    if (Meteor.isServer) {
      const { address } = credentials
      const account = Accounts.findOne({ address })
      if (account && account.banks.includes(bank)) {
        return account
      }
    }
  }
})
