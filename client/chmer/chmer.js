import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Chmer } from '/imports/collection'
import { Session } from 'meteor/session'

Template.chmer.rendered = function () {                                 // 1
   Deps.autorun(function () {                                           // 2
     Meteor.subscribe('Chmer')

   })                                                         //
}

var machineNum = [
  '',
  'E81',
  'E82',
  'E83',
  'E84',
  'E85',
  'E86',
  'E88',
  'F4',
  'F5',
  'F6',
  'W10',
  'W12'
]

var make = [
  '',
  'CHMER',
  'CHMER',
  'CHMER',
  'CHMER',
  'CHMER',
  'CHMER',
  'CHMER',
  'CHMER',
  'CHMER',
  'CHMER',
  'CHMER',
  'CHMER'
]

var model = [
  '',
  'CM 655C',
  'CM 655C',
  'CM 655Z',
  'CM 655Z',
  'CM 655Z',
  'CM 655Z',
  'D433CL',
  'D433CL',
  'CMH32C',
  'CMH32C',
  'AH64C',
  'G64',
  'A422S'
]

var serial = [
  '',
  'M10070834',
  'M12090722',
  'M14040332',
  'M14040333',
  'M14040331',
  'M14040330',
  'M13010012',
  'M12040240',
  'M11120807',
  'M12110782',
  'AM120854',
  'M10010094',
  'M08020085'
]
var psSerial = [
  '',
  'J1011290',
  'J1306161',
  'J1407208',
  'J1407209',
  'J1406179',
  'J1406178',
  'J1304113',
  'J1406169',
  'P12010022',
  'P12110514',
  'AE120854',
  'P004147',
  'C809141'
]

var vac = [
  '',
  '220',
  '480',
  '480',
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

var chmer = {
  machineNum: machineNum,
  make: make,
  model: model,
  serial: serial,
  psSerial: psSerial,
  vac: vac,
  action: action
}

Template.chmer.helpers({
  chmer: function () {
    if (Session.get('select')) {
      return Chmer.find({Serial: Session.get('select')}, { sort: { date: -1 } })
    }
  },
  machineNum: function () {
    return chmer.machineNum
  },
  make: function () {
    return chmer.make
  },
  serial: function () {
    return chmer.serial
  },
  vac: function () {
    return chmer.vac
  },
  model: function () {
    return chmer.model
  },
  action: function () {
    return chmer.action
  }
})

Template.chmer.events({
  'change .machineNum' (event, tmpl) {
    var i = tmpl.find('.machineNum').options.selectedIndex
    tmpl.find('.model').value = chmer.model[i]
    tmpl.find('.make').value = chmer.make[i]
    tmpl.find('.serial').value = chmer.serial[i]
    tmpl.find('.vac').value = chmer.vac[i]
    Session.set('select', tmpl.find('.serial').value = chmer.serial[i])
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
    var chmerInfo = {
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
      Meteor.call('chmerPost', chmerInfo)
      tmpl.find('.chmerForm').reset()
      tmpl.find('.unMet').innerHTML = ''
    }
  },
  'click .removeChmerPost' (event, tmpl) {
    var user = Meteor.user().username
    var pUser = Chmer.find({_id: this._id}).fetch()[0].username
    if (user !== pUser) {
      alert('USERS CAN ONLY DELETE THEIR OWN ITEMS')
    } else {
      Meteor.call('removeChmerPost', this._id)
    }
  }
})
