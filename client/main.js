import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Blaze } from 'meteor/blaze'
import { ReactiveVar } from 'meteor/reactive-var'
import './main.html'
import { Mongo } from 'meteor/mongo'
var cloudinary = require('cloudinary')
// accounts config
Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
})

Meteor.subscribe("users")
