import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Current } from '/imports/collection'
import { Session } from 'meteor/session'

Template.currentEDM.rendered = function () {                                 // 1
   Deps.autorun(function () {                                           // 2
     Meteor.subscribe('Current')

   })                                                         //
}

var machineNum = [
  '',
  'F3'
]

var make = [
  '',
  'CurrentEDM'
]

var model = [
  '',
  'MT40SJ'
]

var serial = [
  '',
  '82631'
]

var vac = [
  '',
  '220'
]
var action = [
  '',
  'filter',
  'switch',
  'valve',
  'de-sludge',
  'hydraulic',
  'flush pump',
  'fill pump',
  'Misc.'
]
var current = {
  machineNum: machineNum,
  make: make,
  model: model,
  serial: serial,
  vac: vac,
  action: action
}

Template.currentEDM.helpers({
  current: function () {
    if (Session.get('select')) {
      return Current.find({Serial: Session.get('select')}, { sort: { date: -1 } })
    }
  },
  machineNum: function () {
    return current.machineNum
  },
  make: function () {
    return current.make
  },
  serial: function () {
    return current.serial
  },
  vac: function () {
    return current.vac
  },
  model: function () {
    return current.model
  },
  action: function () {
    return current.action
  }
})

Template.currentEDM.events({
  'change .machineNum' (event, tmpl) {
    var i = tmpl.find('.machineNum').options.selectedIndex
    tmpl.find('.model').value = current.model[i]
    tmpl.find('.make').value = current.make[i]
    tmpl.find('.serial').value = current.serial[i]
    tmpl.find('.vac').value = current.vac[i]
    Session.set('select', tmpl.find('.serial').value = current.serial[i])
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
    var currentInfo = {
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
      Meteor.call('currentPost', currentInfo)
      tmpl.find('.currentForm').reset()
      tmpl.find('.unMet').innerHTML = ''
    }
  },
  'click .removeCurrentPost' (event, tmpl) {
    var user = Meteor.user().username
    var pUser = Current.find({_id: this._id}).fetch()[0].username
    if (user !== pUser) {
      alert('USERS CAN ONLY DELETE THEIR OWN ITEMS')
    } else {
      Meteor.call('removeCurrentPost', this._id)
    }
  }
})
