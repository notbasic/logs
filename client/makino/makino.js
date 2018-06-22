import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Makino } from '/imports/collection'
import { Session } from 'meteor/session'

Template.makino.rendered = function () {                                 // 1
  Deps.autorun(function () {                                           // 2
    Meteor.subscribe('Makino')
  })                                                         //
}

var machineNum = [
  '',
  'E89?', // NEED TO CHECK IF THESE ARE CORRECT LATER
  'E90?', // NEED TO CHECK IF THESE ARE CORRECT LATER
  'F7',
  'F8',
  'F9',
  'F10?', // NEED TO CHECK IF THESE ARE CORRECT LATER
  'F11?', // NEED TO CHECK IF THESE ARE CORRECT LATER
  'F12',
  'M14',
  'W13'
]

var make = [
  '',
  'Makino',
  'Makino',
  'Makino',
  'Makino',
  'Makino',
  'Makino',
  'Makino',
  'Makino',
  'Makino',
  'Makino'
]

var model = [
  '',
  'EDAF2', // NEED TO CHECK IF THESE ARE CORRECT LATER
  'EDAF2', // NEED TO CHECK IF THESE ARE CORRECT LATER
  'EDBV3',
  'EDBV8',
  'EDBV3',
  'EDBV3', // NEED TO CHECK IF THESE ARE CORRECT LATER
  'EDBV3', // NEED TO CHECK IF THESE ARE CORRECT LATER
  'EDBV8',
  'F3',
  'U1310'
]

var serial = [
  '',
  'E070293?', // NEED TO CHECK IF THESE ARE CORRECT LATER
  'E070324?', // NEED TO CHECK IF THESE ARE CORRECT LATER
  '8',
  '8',
  '12',
  '14?', // NEED TO CHECK IF THESE ARE CORRECT LATER
  '15?', // NEED TO CHECK IF THESE ARE CORRECT LATER
  '22',
  'U14026',
  '12'
]

var vac = [
  '',
  '480',
  '480',
  '480',
  '480',
  '480',
  '220',
  '220',
  '480',
  '220',
  '480'
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
var makino = {
  machineNum: machineNum,
  make: make,
  model: model,
  serial: serial,
  vac: vac,
  action: action
}

Template.makino.helpers({
  makino: function () {
    if (Session.get('select')) {
      return Makino.find({Serial: Session.get('select')}, { sort: { date: -1 } })
    }
  },
  machineNum: function () {
    return makino.machineNum
  },
  make: function () {
    return makino.make
  },
  serial: function () {
    return makino.serial
  },
  vac: function () {
    return makino.vac
  },
  model: function () {
    return makino.model
  },
  action: function () {
    return makino.action
  }
})

Template.makino.events({
  'change .machineNum' (event, tmpl) {
    var i = tmpl.find('.machineNum').options.selectedIndex
    tmpl.find('.model').value = makino.model[i]
    tmpl.find('.make').value = makino.make[i]
    tmpl.find('.serial').value = makino.serial[i]
    tmpl.find('.vac').value = makino.vac[i]
    Session.set('select', tmpl.find('.serial').value = makino.serial[i])
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
    var makinoInfo = {
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
      Meteor.call('makinoPost', makinoInfo)
      tmpl.find('.makinoForm').reset()
      tmpl.find('.unMet').innerHTML = ''
    }
  },
  'click .removeMakinoPost' (event, tmpl) {
    var user = Meteor.user().username
    var pUser = Makino.find({_id: this._id}).fetch()[0].username
    if (user !== pUser) {
      alert('USERS CAN ONLY DELETE THEIR OWN ITEMS')
    } else {
      Meteor.call('removeMakinoPost', this._id)
    }
  }
})
