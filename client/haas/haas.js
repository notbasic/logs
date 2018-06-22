import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Haas } from '/imports/collection'
import { Session } from 'meteor/session'

Template.haas.rendered = function () {                                 // 1
  Deps.autorun(function () {                                           // 2
    Meteor.subscribe('Haas')
  })                                                         //
}

var machineNum = [
  '',
  'M1',
  'M2',
  'M3',
  'M4',
  'M6',
  'M8',
  'M9',
  'M10',
  'M12',
  'LATHE'
]

var make = [
  '',
  'Haas',
  'Haas',
  'Haas',
  'Haas',
  'Haas',
  'Haas',
  'Haas',
  'Haas',
  'Haas',
  'Haas'
]

var model = [
  '',
  'VF-3B',
  'VF-3B',
  'VF-3B',
  'VF-3B',
  'VF-3B',
  'TM1',
  'VF-5',
  'VF-3BAPCQ',
  'TM1',
  'SL-30T'
]

var serial = [
  '',
  '30014',
  '28996',
  '29011',
  '31240',
  '28385',
  '26568',
  '23736',
  '29013',
  '31221',
  '3075735'
]

var vac = [
  '',
  '480',
  '480',
  '480',
  '480',
  '220',
  '220',
  '220',
  '220',
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
var haas = {
  machineNum: machineNum,
  make: make,
  model: model,
  serial: serial,
  vac: vac,
  action: action
}

Template.haas.helpers({
  haas: function () {
    if (Session.get('select')) {
      return Haas.find({Serial: Session.get('select')}, { sort: { date: -1 } })
    }
  },
  machineNum: function () {
    return haas.machineNum
  },
  make: function () {
    return haas.make
  },
  serial: function () {
    return haas.serial
  },
  vac: function () {
    return haas.vac
  },
  model: function () {
    return haas.model
  },
  action: function () {
    return haas.action
  }
})

Template.haas.events({
  'change .machineNum' (event, tmpl) {
    var i = tmpl.find('.machineNum').options.selectedIndex
    tmpl.find('.model').value = haas.model[i]
    tmpl.find('.make').value = haas.make[i]
    tmpl.find('.serial').value = haas.serial[i]
    tmpl.find('.vac').value = haas.vac[i]
    Session.set('select', tmpl.find('.serial').value = haas.serial[i])
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
    var haasInfo = {
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
      Meteor.call('haasPost', haasInfo)
      tmpl.find('.haasForm').reset()
      tmpl.find('.unMet').innerHTML = ''
    }
  },
  'click .removeHaasPost' (event, tmpl) {
    var user = Meteor.user().username
    var pUser = Haas.find({_id: this._id}).fetch()[0].username
    if (user !== pUser) {
      alert('USERS CAN ONLY DELETE THEIR OWN ITEMS')
    } else {
      Meteor.call('removeHaasPost', this._id)
    }
  }
})
