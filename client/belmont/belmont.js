import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Belmont } from '/imports/collection'
import { Session } from 'meteor/session'

Template.belmont.rendered = function () {                                 // 1
   Deps.autorun(function () {                                           // 2
     Meteor.subscribe('Belmont')

   })                                                         //
}

var machineNum = [
  '',
  'E50',
  'E62'
]

var make = [
  '',
  'BELMONT',
  'BELMONT'
]

var model = [
  '',
  'Maxicut',
  'Maxicut'
]

var serial = [
  '',
  '000403',
  'D98B236074'
]

var vac = [
  '',
  '220',
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
var belmont = {
  machineNum: machineNum,
  make: make,
  model: model,
  serial: serial,
  vac: vac,
  action: action
}

Template.belmont.helpers({
  belmont: function () {
    if (Session.get('select')) {
      return Belmont.find({Serial: Session.get('select')}, { sort: { date: -1 } })
    }
  },
  machineNum: function () {
    return belmont.machineNum
  },
  make: function () {
    return belmont.make
  },
  serial: function () {
    return belmont.serial
  },
  vac: function () {
    return belmont.vac
  },
  model: function () {
    return belmont.model
  },
  action: function () {
    return belmont.action
  }
})

Template.belmont.events({
  'change .machineNum' (event, tmpl) {
    var i = tmpl.find('.machineNum').options.selectedIndex
    tmpl.find('.model').value = belmont.model[i]
    tmpl.find('.make').value = belmont.make[i]
    tmpl.find('.serial').value = belmont.serial[i]
    tmpl.find('.vac').value = belmont.vac[i]
    Session.set('select', tmpl.find('.serial').value = belmont.serial[i])
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
    var belmontInfo = {
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
      Meteor.call('belmontPost', belmontInfo)
      tmpl.find('.belmontForm').reset()
      tmpl.find('.unMet').innerHTML = ''
    }
  },
  'click .removeBelmontPost' (event, tmpl) {
    var user = Meteor.user().username
    var pUser = Belmont.find({_id: this._id}).fetch()[0].username
    if (user !== pUser) {
      alert('USERS CAN ONLY DELETE THEIR OWN ITEMS')
    } else {
      Meteor.call('removeBelmontPost', this._id)
    }
  }
})
