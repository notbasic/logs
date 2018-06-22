import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Elox } from '/imports/collection'
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo'
Template.elox.rendered = function () {                                 // 1
   Deps.autorun(function () {                                           // 2
     Meteor.subscribe('Elox')

   })                                                         //
}

var machineNumber = [
  '',
  'E2',
  'E3',
  'E4',
  'E5',
  'E6',
  'E8',
  'E9',
  'E10',
  'E11',
  'E13',
  'E15',
  'E18',
  'E20',
  'E22',
  'E23',
  'E24',
  'E25',
  'E27',
  'E28',
  'E29',
  'E30',
  'E31',
  'E32',
  'E33',
  'E34',
  'E35',
  'E36',
  'E37',
  'E39',
  'E40',
  'E41',
  'E42',
  'E43',
  'E45',
  'E46',
  'E47',
  'E48',
  'E63',
  'E64',
  'E68',
  'E70',
  'E71',
  'E77'
]
var make = [
  '',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX'

]
var model = [
  '',
  'HRP-63',
  'HRP-63',
  'HRP-63',
  'HRP-64',
  'HRP-63_B',
  'HRP-63',
  'HRP-103',
  'HRP-104',
  'HRP-103',
  'HRP-103',
  'HRP-99',
  'HRP-104',
  'HRP-104',
  'HRP-104',
  '8-62',
  'SPECIAL MOD.12',
  'SPECIAL MOD.12',
  'HRP-103',
  'HRP-104',
  'HRP-103',
  'HRP-89',
  'HRP-103',
  'HRP-104',
  'HRP-103',
  'HRP-104',
  'HRP-63',
  '8-2012',
  '8-2012',
  'HRP-??',
  'HRP-64',
  'HRP-103',
  'HRP-103',
  'HRP-104',
  'HRP-103',
  'HRP-104',
  'HRP-103',
  'HRP-103',
  'ROYALE',
  '8-2012DR',
  '8-2012DR',
  '8-2012DR',
  '8-2814',
  '12-3816P'
]
var serial = [
  '',
  '284',
  '393',
  '1466',
  '1419',
  '506',
  '338',
  '989',
  '910',
  '826',
  '631',
  '1014',
  '1633',
  '1178',
  '998',
  '042498',
  '032300',
  '032301',
  '669',
  '903',
  '640',
  '160',
  'R.O.SPEC.',
  '758',
  '621',
  '865',
  '1047',
  '011795',
  '1676',
  '424',
  '557',
  '730',
  '552',
  '939',
  '1469',
  '1009',
  '511',
  '690',
  '063351',
  '042555',
  '003658',
  '052864',
  '011937',
  '004343'
]
var vac = [
  '',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220',
  '480/220'
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

var machine = {
  number: machineNumber,
  make: make,
  model: model,
  serial: serial,
  vac: vac,
  action: action
}
Template.elox.helpers({
  eMachine: function () {
    if (Session.get('select')) {
      return Elox.find({serial: Session.get('select')}, { sort: { date: -1 } })
    }
  },
  number: function () {
    return machine.number
  },
  make: function () {
    return machine.make
  },
  model: function () {
    return machine.model
  },
  serial: function () {
    return machine.serial
  },
  vac: function () {
    return machine.vac
  },
  action: function () {
    return machine.action
  }
})
Template.elox.events({
  'change .machineNumber' (event, tmpl) {
    // var here = tmpl.find('.machineNumber').options.length
    // console.log(here)
    var i = tmpl.find('.machineNumber').options.selectedIndex
    tmpl.find('.model').value = machine.model[i]
    tmpl.find('.make').value = machine.make[i]
    tmpl.find('.serial').value = machine.serial[i]
    tmpl.find('.vac').value = machine.vac[i]
    Session.set('select', tmpl.find('.serial').value = machine.serial[i])
  },
  'click .submit' (event, tmpl) {
    event.preventDefault()
    var i = tmpl.find('.machineNumber').options.selectedIndex
    var a = tmpl.find('.action').options.selectedIndex
    var text = tmpl.find('.text').value
    var vac = tmpl.find('.vac').value
    var serial = tmpl.find('.serial').value
    var make = tmpl.find('.make').value
    var machineNumber = tmpl.find('.machineNumber').options[i].text
    var action = tmpl.find('.action').options[a].text
    var eloxInfo = {
      text: text,
      vac: vac,
      serial: serial,
      make: make,
      number: machineNumber,
      action: action
    }
    if (i <= 0 || tmpl.find('.text').value.trim() === '' || a <= 0) {
      tmpl.find('.unMet').innerHTML = 'all required fields must be met before submit!!'
    } else {
      Meteor.call('eloxPost', eloxInfo)
      tmpl.find('.eloxForm').reset()
      tmpl.find('.unMet').innerHTML = ''
    }
  },
  'click .removeEloxPost' (event, tmpl) {
    var user = Meteor.user().username
    var pUser = Elox.find({_id: this._id}).fetch()[0].username
    if (user !== pUser) {
      alert('USERS CAN ONLY DELETE THEIR OWN ITEMS')
    } else {
      Meteor.call('removeEloxPost', this._id)
    }
  }
})
