import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Powersupply } from '/imports/collection'
import { Session } from 'meteor/session'

Template.powersupply.rendered = function () {                                 // 1
  Deps.autorun(function () {                                           // 2
    Meteor.subscribe('Powersupply')
  })                                                         //
}

var serial = [
  '',
  '????',
  '000148',
  '000162',
  '000163',
  '000549',
  '000550',
  '001425',
  '001703',
  '010390',
  '011638',
  '0125',
  '040201',
  '040555',
  '050584',
  '051499',
  '051541',
  '07259',
  '08479',
  '08532',
  '09295',
  '09354',
  '113',
  '114',
  '11675',
  '11690',
  '136',
  '14214',
  '14482',
  '14501',
  '14503',
  '148',
  '149',
  '152',
  '178',
  '181',
  'PS-1300',
  'PS-1356',
  'sn239'
]
var serialplus = [
  '',
  '????',
  '000148',
  '000162',
  '000163',
  '000549',
  '000550',
  '001425',
  '001703',
  '010390',
  '011638',
  '0125',
  '040201',
  '040555',
  '050584',
  '051499',
  '051541',
  '07259',
  '08479',
  '08532',
  '09295',
  '09354',
  '113',
  '114',
  '11675',
  '11690',
  '136',
  '14214',
  '14482',
  '14501',
  '14503',
  '148',
  '149',
  '152',
  '178',
  '181',
  'PS-1300',
  'PS-1356',
  'sn239'
]

var make = [
  '',
  'HANSVEDT EDM',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'Brave Heart',
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
  'XERMAC',
  'XERMAC',
  'ELOX',
  'ELOX',
  'XERMAC',
  'ELOX',
  'ELOX',
  'ELOX',
  'ELOX',
  'XERMAC',
  'XERMAC',
  'XERMAC',
  'XERMAC',
  'XERMAC',
  'ELOX',
  'ELOX',
  'BRETCO'
]

var model = [
  '',
  '201',
  'B50s',
  'B50s',
  'B50s',
  '100D MKII',
  '100D MKII',
  '50s/MKII',
  '50s/MKII',
  'ASTRA 100D',
  '50s MKII',
  'BHC 100A',
  'ASTRA 400D',
  'ASTRA 200D',
  'ASTRA 200D',
  'ASTRA 50s',
  'ASTRA 50S',
  'TC-200D',
  'T-50s',
  'TC-50s',
  'TC-100D',
  'TC-200D',
  'FX100',
  'FX100',
  'TCV-50s',
  'TCV-50s',
  'FX100',
  'TCV-100s',
  'TCV-200D',
  'TCV-200D',
  'TCV-200D',
  'FX100',
  'FX100',
  'FX100',
  'FX100',
  'FX100',
  'B50s',
  'CENTRA 50s',
  'RP64'
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
  '480/220'
]

var description = [
  '',
  'SINGLE',
  'SINGLE',
  'SINGLE',
  'SINGLE',
  'DOUBLE',
  'DOUBLE',
  'SINGLE',
  'SINGLE',
  'DOUBLE',
  'SINGLE',
  'SINGLE',
  'DOUBLE',
  'DOUBLE',
  'DOUBLE',
  'SINGLE',
  'SINGLE',
  'DOUBLE',
  'SINGLE',
  'SINGLE',
  'DOUBLE',
  'DOUBLE',
  'SINGLE',
  'SINGLE',
  'SINGLE',
  'SINGLE',
  'SINGLE',
  'DOUBLE',
  'DOUBLE',
  'DOUBLE',
  'DOUBLE',
  'SINGLE',
  'SINGLE',
  'SINGLE',
  'SINGLE',
  'SINGLE',
  'SINGLE',
  'SINGLE',
  'SINGLE'
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
var ps = {
  make: make,
  model: model,
  serial: serial,
  vac: vac,
  descr: description,
  serialplus: serialplus,
  action: action
}

Template.powersupply.helpers({
  powersupply: function () {
    if (Session.get('select')) {
      return Powersupply.find({psSerial: Session.get('select')}, { sort: { date: -1 } })
    }
  },
  make: function () {
    return ps.make
  },
  model: function () {
    return ps.model
  },
  serial: function () {
    return ps.serial
  },
  vac: function () {
    return ps.vac
  },
  descr: function () {
    return ps.descr
  },
  serialplus: function () {
    return ps.serialplus
  },
  action: function () {
    return ps.action
  }
})

Template.powersupply.events({
  'change .serial' (event, tmpl) {
    // var here = tmpl.find('.machineNumber').options.length
    // console.log(here)
    var i = tmpl.find('.serial').options.selectedIndex
    tmpl.find('.model').value = ps.model[i]
    tmpl.find('.serialplus').value = ps.serialplus[i]
    tmpl.find('.make').value = ps.make[i]
    tmpl.find('.vac').value = ps.vac[i]
    tmpl.find('.descr').value = ps.descr[i]
    var descr = tmpl.find('.descr').value
    if (descr === 'DOUBLE') {
      tmpl.find('.input-group').style = 'display: show'
      tmpl.find('#r0').checked = true
      tmpl.find('#r1').checked = false
      tmpl.find('#r2').checked = false
      tmpl.find('#r3').checked = false
    }
    if (descr === 'SINGLE') {
      tmpl.find('.input-group').style = 'display: none'
      tmpl.find('#r0').checked = true
      tmpl.find('#r1').checked = false
      tmpl.find('#r2').checked = false
      tmpl.find('#r3').checked = false
    }

    Session.set('select', tmpl.find('.serialplus').value = ps.serialplus[i])
  },
  'click .submit' (event, tmpl) {
    event.preventDefault()
    var i = tmpl.find('.serial').options.selectedIndex
    var a = tmpl.find('.action').options.selectedIndex
    var text = tmpl.find('.text').value
    var vac = tmpl.find('.vac').value
    var make = tmpl.find('.make').value
    var descr = tmpl.find('.descr').value
    serial = tmpl.find('.serial').options[i].text
    var action = tmpl.find('.action').options[a].text
    var side = tmpl.find('input[name = "Side"]:checked').value
    var psInfo = {
      text: text,
      vac: vac,
      serial: serial,
      make: make,
      side: side,
      descr: descr,
      action: action
    }

    if (descr === 'DOUBLE') {
      if (i <= 0 || tmpl.find('.text').value.trim() === '' || tmpl.find('#r0').checked === true || a <= 0) {
        tmpl.find('.unMet').innerHTML = 'all required fields must be met before submit!!'
      } else {
        tmpl.find('.unMet').innerHTML = ''
        Meteor.call('psPost', psInfo)
        tmpl.find('.serial').options.selectedIndex = 0
        tmpl.find('.text').value = ''
        tmpl.find('.input-group').style = 'display: none'
      }
    } else {
      if (i <= 0 || tmpl.find('.text').value.trim() === '' || a <= 0) {
        tmpl.find('.unMet').innerHTML = 'all required fields must be met before submit!!'
      } else {
        tmpl.find('.unMet').innerHTML = ''
        Meteor.call('psPost', psInfo)
        tmpl.find('.text').value = ''
        tmpl.find('.serial').options.selectedIndex = 0
        tmpl.find('.input-group').style = 'display: none'
      }
    }
  },
  'click .removePsPost' (event, tmpl) {
    var user = Meteor.user().username
    var pUser = Powersupply.find({_id: this._id}).fetch()[0].username
    if (user !== pUser) {
      alert('USERS CAN ONLY DELETE THEIR OWN ITEMS')
    } else {
      Meteor.call('removePowersupplyPost', this._id)
    }
  }
})
