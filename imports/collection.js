import { Mongo } from 'meteor/mongo'
export const Elox = new Mongo.Collection('elox')
export const Powersupply = new Mongo.Collection('powersupply')
export const Mondo = new Mongo.Collection('mondo')
export const Fanuc = new Mongo.Collection('fanuc')
export const Makino = new Mongo.Collection('makino')
export const Belmont = new Mongo.Collection('belmont')
export const Haas = new Mongo.Collection('haas')
export const Sodick = new Mongo.Collection('sodick')
export const Chmer = new Mongo.Collection('chmer')
export const Current = new Mongo.Collection('current')
export const Images = new Mongo.Collection('images')
export const Pics = new Mongo.Collection('pics')
import { Meteor } from 'meteor/meteor'

// setup security on Images collection
Elox.allow({
  insert: function (userId, doc) {
    if (Meteor.user()) { // they are logged in
      console.log(doc)
// force the image to be owned by the user
      if (Meteor.user().username !== doc.username) { // user is messing around
        return false
      } else { // the user is logged in, the image has the correct userId
        return true
      }
    } else {
      return false
    }
  },
  remove: function (userId, doc) {
    if (Meteor.user()) { // they are logged in
      console.log(doc)
// force the image to be owned by the user
      if (Meteor.user().username !== doc.username) { // user is messing around
        return false
      } else { // the user is logged in, the image has the correct userId
        return true
      }
    } else {
      return false
    }
  },
  update: function (userId, doc) {
    if (Meteor.user()) { // they are logged in
      console.log(doc)
// force the image to be owned by the user
      if (Meteor.user().username !== doc.username) { // user is messing around
        return false
      } else { // the user is logged in, the image has the correct userId
        return true
      }
    } else {
      return false
    }
  }
})
