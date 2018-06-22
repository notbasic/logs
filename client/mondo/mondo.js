import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Mondo } from '/imports/collection'
import { Session } from 'meteor/session'

Template.mondo.rendered = function () {                                 // 1
  Deps.autorun(function () {                                           // 2
    Meteor.subscribe('Mondo')
  })                                                         //
}

var machineNum = [
  '',
  'E56',
  'E57',
  '59',
  '61'
]

var make = [
  '',
  'AGIE MONDO',
  'AGIE MONDO',
  'AGIE MONDO',
  'AGIE MONDO'
]

var model = [
  '',
  'Futura II 1PMHP',
  'Futura II 25A',
  'Futura II 40A HP',
  'Futura III 2PM'
]

var serial = [
  '',
  '001130',
  '004239',
  '004160',
  '000024'
]

var vac = [
  '',
  '480',
  '220',
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
var mondo = {
  machineNum: machineNum,
  make: make,
  model: model,
  serial: serial,
  vac: vac,
  action: action
}

Template.mondo.helpers({
  mondo: function () {
    if (Session.get('select')) {
      return Mondo.find({Serial: Session.get('select')}, { sort: { date: -1 } })
    }
  },
  machineNum: function () {
    return mondo.machineNum
  },
  make: function () {
    return mondo.make
  },
  serial: function () {
    return mondo.serial
  },
  vac: function () {
    return mondo.vac
  },
  model: function () {
    return mondo.model
  },
  action: function () {
    return mondo.action
  }
})

Template.mondo.events({
  'change .machineNum' (event, tmpl) {
    // var here = tmpl.find('.machineNumber').options.length
    // console.log(here)
    var i = tmpl.find('.machineNum').options.selectedIndex
    tmpl.find('.model').value = mondo.model[i]
    tmpl.find('.make').value = mondo.make[i]
    tmpl.find('.serial').value = mondo.serial[i]
    tmpl.find('.vac').value = mondo.vac[i]
    Session.set('select', tmpl.find('.serial').value = mondo.serial[i])
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
    var mondoInfo = {
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
      Meteor.call('mondoPost', mondoInfo)
      tmpl.find('.mondoForm').reset()
      tmpl.find('.unMet').innerHTML = ''
    }
  },
  'click .removeMondoPost' (event, tmpl) {
    var user = Meteor.user().username
    var pUser = Mondo.find({_id: this._id}).fetch()[0].username
    if (user !== pUser) {
      alert('USERS CAN ONLY DELETE THEIR OWN ITEMS')
    } else {
      Meteor.call('removeMondoPost', this._id)
    }
  }
})
