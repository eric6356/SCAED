import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

export const Accounts = new Mongo.Collection('accounts')

Meteor.methods({
  'accounts.signIn' ({ address }) {
    if (Meteor.isServer) {
      return Accounts.findOne({ address })
    }
  }
})
