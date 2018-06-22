import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Sodick } from '/imports/collection'
import { Session } from 'meteor/session'

Template.sodick.rendered = function () {                                 // 1
  Deps.autorun(function () {                                           // 2
    Meteor.subscribe('Sodick')
  })                                                         //
}
var machineNum = [
  '',
  'F1',
  'F2',
  'W9',
  'W14'
]

var make = [
  '',
  'Sodick',
  'Sodick',
  'Sodick',
  'Sodick'
]

var model = [
  '',
  'K1CN',
  'K1CN',
  'AQ750L',
  'AQ750L'
]

var serial = [
  '',
  '1395',
  '1445',
  '0183',
  'T0940'
]

var vac = [
  '',
  '220',
  '220',
  '220',
  '220'
]

var action = [
  '',
  'filter',
  'motor',
  'pump',
  'wire',
  'monitor',
  'breaker',
  'fuse',
  'Misc.'
]

var sodick = {
  machineNum: machineNum,
  make: make,
  model: model,
  serial: serial,
  vac: vac,
  action: action
}

Template.sodick.helpers({
  sodick: function () {
    if (Session.get('select')) {
      return Sodick.find({Serial: Session.get('select')}, { sort: { date: -1 } })
    }
  },
  formattedDate: function () {
    console.log(this.date)
  },
  machineNum: function () {
    return sodick.machineNum
  },
  make: function () {
    return sodick.make
  },
  serial: function () {
    return sodick.serial
  },
  vac: function () {
    return sodick.vac
  },
  model: function () {
    return sodick.model
  },
  action: function () {
    return sodick.action
  }
})

Template.sodick.events({
  'change .machineNum' (event, tmpl) {
    var i = tmpl.find('.machineNum').options.selectedIndex
    tmpl.find('.model').value = sodick.model[i]
    tmpl.find('.make').value = sodick.make[i]
    tmpl.find('.serial').value = sodick.serial[i]
    tmpl.find('.vac').value = sodick.vac[i]
    Session.set('select', tmpl.find('.serial').value = sodick.serial[i])
  },
  'click .submit' (event, tmpl) {
    event.preventDefault()
    var i = tmpl.find('.machineNum').options.selectedIndex
    var a = tmpl.find('.action').options.selectedIndex
    var text = tmpl.find('.text').value
    var vac = tmpl.find('.vac').value
    var serial = tmpl.find('.serial').value
    var make = tmpl.find('.make').value
    var machineNum = tmpl.find('.machineNum').options[i].text
    var action = tmpl.find('.action').options[a].text
    var sodickInfo = {
      text: text,
      vac: vac,
      serial: serial,
      make: make,
      number: machineNum,
      action: action
    }
    if (i <= 0 || tmpl.find('.text').value.trim() === '' || a <= 0) {
      tmpl.find('.unMet').innerHTML = 'all required fields must be met before submit!!'
    } else {
      Meteor.call('sodickPost', sodickInfo)
      tmpl.find('.sodickForm').reset()
      tmpl.find('.unMet').innerHTML = ''
    }
  },
  'click .removeSodickPost' (event, tmpl) {
    var user = Meteor.user().username
    var pUser = Sodick.find({_id: this._id}).fetch()[0].username
    if (user !== pUser) {
      alert('USERS CAN ONLY DELETE THEIR OWN ITEMS')
    } else {
      Meteor.call('removeSodickPost', this._id)
    }
  }
})
