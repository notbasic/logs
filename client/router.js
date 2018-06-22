import { Meteor } from 'meteor/meteor'

Router.configure({
  layoutTemplate: 'layout'
})
Router.map(function () {
  this.route('home', {path: '/'})
  this.route('elox', {path: '/elox'})
  this.route('powersupply', {path: '/powersupply'})
  this.route('mondo', {path: '/mondo'})
  this.route('fanuc', {path: '/fanuc'})
  this.route('makino', {path: '/makino'})
  this.route('belmont', {path: '/belmont'})
  this.route('sodick', {path: '/sodick'})
  this.route('chmer', {path: '/chmer'})
  this.route('haas', {path: '/haas'})
  this.route('profileImage', {path: '/profileImage'})
  this.route('currentEDM', {path: '/currentEDM'})
})
Router.onBeforeAction(function () {
  // all properties available in the route function
  // are also available here such as this.params

  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    Router.go('home')
    this.next()
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.next()
  }
})

Router.route('/users/:username', {
  name: 'userProfile',
  data: function () {
    return {
      user: Meteor.users.findOne({username: this.params.username})
    }
  }
})
