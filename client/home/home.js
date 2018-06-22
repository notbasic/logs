import { Meteor } from 'meteor/meteor'
import { Elox } from '/imports/collection'
import { Powersupply } from '/imports/collection'
import { Fanuc } from '/imports/collection'
import { Makino } from '/imports/collection'
import { Belmont } from '/imports/collection'
import { Haas } from '/imports/collection'
import { Sodick } from '/imports/collection'
import { Chmer } from '/imports/collection'
import { Mondo } from '/imports/collection'
import { Current } from '/imports/collection'
import { Template } from 'meteor/templating'

Template.home.rendered = function () {                                 // 1
  Deps.autorun(function () {                                           // 2
    Meteor.subscribe('Elox')
    Meteor.subscribe('Powersupply')                        // 3
    Meteor.subscribe('Fanuc')
    Meteor.subscribe('Makino')
    Meteor.subscribe('Belmont')
    Meteor.subscribe('Haas')
    Meteor.subscribe('Sodick')
    Meteor.subscribe('Chmer')
    Meteor.subscribe('Mondo')
    Meteor.subscribe('Current')
  })                                                         //
}

Template.home.helpers({
  eMachine: function () {
    return Elox.find({parent: null}, { sort: { date: -1 } })
  },
  powersupply: function () {
    return Powersupply.find({parent: null}, { sort: { date: -1 } })
  },
  mondo: function () {
    return Mondo.find({parent: null}, { sort: { date: -1 } })
  },
  fanuc: function () {
    return Fanuc.find({parent: null}, { sort: { date: -1 } })
  },
  makino: function () {
    return Makino.find({parent: null}, { sort: { date: -1 } })
  },
  belmont: function () {
    return Belmont.find({parent: null}, { sort: { date: -1 } })
  },
  sodick: function () {
    return Sodick.find({parent: null}, { sort: { date: -1 } })
  },
  chmer: function () {
    return Chmer.find({parent: null}, { sort: { date: -1 } })
  },
  haas: function () {
    return Haas.find({parent: null}, { sort: { date: -1 } })
  },
  current: function () {
    return Current.find({parent: null}, { sort: { date: -1 } })
  }
})

Template.home.events({
  'click .post' (event, tmpl) {
    var M = tmpl.find('input[name = "post"]:checked').value
    if (M === 'none') {
      tmpl.find('.elox-group').style = 'display: none'
      tmpl.find('.powersupply-group').style = 'display: none'
      tmpl.find('.mondo-group').style = 'display: none'
      tmpl.find('.makino-group').style = 'display: none'
      tmpl.find('.belmont-group').style = 'display: none'
      tmpl.find('.sodick-group').style = 'display: none'
      tmpl.find('.chmer-group').style = 'display: none'
      tmpl.find('.haas-group').style = 'display: none'
      tmpl.find('.current-group').style = 'display: none'
      tmpl.find('.fanuc-group').style = 'display: none'
    } else if (M === 'elox') {
      tmpl.find('.elox-group').style = 'display: show'
      tmpl.find('.mondo-group').style = 'display: none'
      tmpl.find('.powersupply-group').style = 'display: none'
      tmpl.find('.makino-group').style = 'display: none'
      tmpl.find('.belmont-group').style = 'display: none'
      tmpl.find('.sodick-group').style = 'display: none'
      tmpl.find('.chmer-group').style = 'display: none'
      tmpl.find('.haas-group').style = 'display: none'
      tmpl.find('.current-group').style = 'display: none'
      tmpl.find('.fanuc-group').style = 'display: none'
    } else if (M === 'powersupply') {
      tmpl.find('.powersupply-group').style = 'display: show'
      tmpl.find('.elox-group').style = 'display: none'
      tmpl.find('.mondo-group').style = 'display: none'
      tmpl.find('.makino-group').style = 'display: none'
      tmpl.find('.belmont-group').style = 'display: none'
      tmpl.find('.sodick-group').style = 'display: none'
      tmpl.find('.chmer-group').style = 'display: none'
      tmpl.find('.haas-group').style = 'display: none'
      tmpl.find('.current-group').style = 'display: none'
      tmpl.find('.fanuc-group').style = 'display: none'
    } else if (M === 'mondo') {
      tmpl.find('.powersupply-group').style = 'display: none'
      tmpl.find('.fanuc-group').style = 'display: none'
      tmpl.find('.elox-group').style = 'display: none'
      tmpl.find('.makino-group').style = 'display: none'
      tmpl.find('.belmont-group').style = 'display: none'
      tmpl.find('.sodick-group').style = 'display: none'
      tmpl.find('.chmer-group').style = 'display: none'
      tmpl.find('.haas-group').style = 'display: none'
      tmpl.find('.current-group').style = 'display: none'
      tmpl.find('.mondo-group').style = 'display: show'
    } else if (M === 'fanuc') {
      tmpl.find('.powersupply-group').style = 'display: none'
      tmpl.find('.elox-group').style = 'display: none'
      tmpl.find('.mondo-group').style = 'display: none'
      tmpl.find('.makino-group').style = 'display: none'
      tmpl.find('.belmont-group').style = 'display: none'
      tmpl.find('.sodick-group').style = 'display: none'
      tmpl.find('.chmer-group').style = 'display: none'
      tmpl.find('.haas-group').style = 'display: none'
      tmpl.find('.current-group').style = 'display: none'
      tmpl.find('.fanuc-group').style = 'display: show'
    } else if (M === 'makino') {
      tmpl.find('.powersupply-group').style = 'display: none'
      tmpl.find('.elox-group').style = 'display: none'
      tmpl.find('.mondo-group').style = 'display: none'
      tmpl.find('.fanuc-group').style = 'display: none'
      tmpl.find('.belmont-group').style = 'display: none'
      tmpl.find('.sodick-group').style = 'display: none'
      tmpl.find('.chmer-group').style = 'display: none'
      tmpl.find('.haas-group').style = 'display: none'
      tmpl.find('.current-group').style = 'display: none'
      tmpl.find('.makino-group').style = 'display: show'
    } else if (M === 'belmont') {
      tmpl.find('.powersupply-group').style = 'display: none'
      tmpl.find('.elox-group').style = 'display: none'
      tmpl.find('.mondo-group').style = 'display: none'
      tmpl.find('.fanuc-group').style = 'display: none'
      tmpl.find('.makino-group').style = 'display: none'
      tmpl.find('.sodick-group').style = 'display: none'
      tmpl.find('.chmer-group').style = 'display: none'
      tmpl.find('.haas-group').style = 'display: none'
      tmpl.find('.current-group').style = 'display: none'
      tmpl.find('.belmont-group').style = 'display: show'
    } else if (M === 'sodick') {
      tmpl.find('.powersupply-group').style = 'display: none'
      tmpl.find('.elox-group').style = 'display: none'
      tmpl.find('.mondo-group').style = 'display: none'
      tmpl.find('.fanuc-group').style = 'display: none'
      tmpl.find('.makino-group').style = 'display: none'
      tmpl.find('.belmont-group').style = 'display: none'
      tmpl.find('.chmer-group').style = 'display: none'
      tmpl.find('.haas-group').style = 'display: none'
      tmpl.find('.current-group').style = 'display: none'
      tmpl.find('.sodick-group').style = 'display: show'
    } else if (M === 'chmer') {
      tmpl.find('.powersupply-group').style = 'display: none'
      tmpl.find('.elox-group').style = 'display: none'
      tmpl.find('.mondo-group').style = 'display: none'
      tmpl.find('.fanuc-group').style = 'display: none'
      tmpl.find('.makino-group').style = 'display: none'
      tmpl.find('.belmont-group').style = 'display: none'
      tmpl.find('.sodick-group').style = 'display: none'
      tmpl.find('.haas-group').style = 'display: none'
      tmpl.find('.current-group').style = 'display: none'
      tmpl.find('.chmer-group').style = 'display: show'
    } else if (M === 'haas') {
      tmpl.find('.powersupply-group').style = 'display: none'
      tmpl.find('.elox-group').style = 'display: none'
      tmpl.find('.mondo-group').style = 'display: none'
      tmpl.find('.fanuc-group').style = 'display: none'
      tmpl.find('.makino-group').style = 'display: none'
      tmpl.find('.belmont-group').style = 'display: none'
      tmpl.find('.sodick-group').style = 'display: none'
      tmpl.find('.chmer-group').style = 'display: none'
      tmpl.find('.current-group').style = 'display: none'
      tmpl.find('.haas-group').style = 'display: show'
    } else if (M === 'current') {
      tmpl.find('.powersupply-group').style = 'display: none'
      tmpl.find('.elox-group').style = 'display: none'
      tmpl.find('.mondo-group').style = 'display: none'
      tmpl.find('.fanuc-group').style = 'display: none'
      tmpl.find('.makino-group').style = 'display: none'
      tmpl.find('.belmont-group').style = 'display: none'
      tmpl.find('.sodick-group').style = 'display: none'
      tmpl.find('.chmer-group').style = 'display: none'
      tmpl.find('.haas-group').style = 'display: none'
      tmpl.find('.current-group').style = 'display: show'
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
  },
  'click .removeMondoPost' (event, tmpl) {
    var user = Meteor.user().username
    var pUser = Mondo.find({_id: this._id}).fetch()[0].username
    if (user !== pUser) {
      alert('USERS CAN ONLY DELETE THEIR OWN ITEMS')
    } else {
      Meteor.call('removeMondoPost', this._id)
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
  },
  'click .removeMakinoPost' (event, tmpl) {
    var user = Meteor.user().username
    var pUser = Makino.find({_id: this._id}).fetch()[0].username
    if (user !== pUser) {
      alert('USERS CAN ONLY DELETE THEIR OWN ITEMS')
    } else {
      Meteor.call('removeMakinoPost', this._id)
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
  },
  'click .removeHaasPost' (event, tmpl) {
    var user = Meteor.user().username
    var pUser = Haas.find({_id: this._id}).fetch()[0].username
    if (user !== pUser) {
      alert('USERS CAN ONLY DELETE THEIR OWN ITEMS')
    } else {
      Meteor.call('removeHaasPost', this._id)
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
  },
  'click .removeChmerPost' (event, tmpl) {
    var user = Meteor.user().username
    var pUser = Chmer.find({_id: this._id}).fetch()[0].username
    if (user !== pUser) {
      alert('USERS CAN ONLY DELETE THEIR OWN ITEMS')
    } else {
      Meteor.call('removeChmerPost', this._id)
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
