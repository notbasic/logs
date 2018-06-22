import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Fanuc } from '/imports/collection'
import { Session } from 'meteor/session'

Template.fanuc.rendered = function () {                                 // 1
   Deps.autorun(function () {                                           // 2
     Meteor.subscribe('Fanuc')

   })                                                         //
}

var machineNum = [
  '',
  'W1',
  'W2',
  'W4',
  'W5',
  'W6',
  'W7',
  'W8'
]

var make = [
  '',
  'FANUC',
  'FANUC',
  'FANUC',
  'FANUC',
  'FANUC',
  'FANUC',
  'FANUC'
]

var model = [
  '',
  'Wire-Cut W1',
  'Tape-Cut Model R',
  'Wire-Cut W1',
  'Wire-Cut W1',
  'Wire-Cut W1',
  'RoboCut α-1B',
  'Tape-Cut Model P'

]

var serial = [
  '',
  'P905W1726',
  'C-5R0055',
  'P903W1664',
  'P904W1709',
  'P9031672',
  '9511B131',
  'C-6P0490'
]

var vac = [
  '',
  '480',
  '480',
  '480',
  '480',
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
var fanuc = {
  machineNum: machineNum,
  make: make,
  model: model,
  serial: serial,
  vac: vac,
  action: action
}

Template.fanuc.helpers({
  fanuc: function () {
    if (Session.get('select')) {
      return Fanuc.find({Serial: Session.get('select')}, { sort: { date: -1 } })
    }
  },
  machineNum: function () {
    return fanuc.machineNum
  },
  make: function () {
    return fanuc.make
  },
  serial: function () {
    return fanuc.serial
  },
  vac: function () {
    return fanuc.vac
  },
  model: function () {
    return fanuc.model
  },
  action: function () {
    return fanuc.action
  }
})

Template.fanuc.events({
  'change .machineNum' (event, tmpl) {
    // var here = tmpl.find('.machineNumber').options.length
    // console.log(here)
    var i = tmpl.find('.machineNum').options.selectedIndex
    tmpl.find('.model').value = fanuc.model[i]
    tmpl.find('.make').value = fanuc.make[i]
    tmpl.find('.serial').value = fanuc.serial[i]
    tmpl.find('.vac').value = fanuc.vac[i]
    Session.set('select', tmpl.find('.serial').value = fanuc.serial[i])
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
    var fanucInfo = {
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
      Meteor.call('fanucPost', fanucInfo)
      tmpl.find('.fanucForm').reset()
      tmpl.find('.unMet').innerHTML = ''
    }
  },
  'click .removeFanucPost' (event, tmpl) {
    var user = Meteor.user().username
    var pUser = Fanuc.find({_id: this._id}).fetch()[0].username
    if (user !== pUser) {
      alert('USERS CAN ONLY DELETE THEIR OWN ITEMS')
    } else {
      Meteor.call('removeFanucPost', this._id)
    }
  }
})
