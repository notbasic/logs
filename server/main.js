import { Meteor } from 'meteor/meteor'
import { Elox } from '/imports/collection'
import { Mondo } from '/imports/collection'
import { Powersupply } from '/imports/collection'
import { Makino } from '/imports/collection'
import { Fanuc } from '/imports/collection'
import { Sodick } from '/imports/collection'
import { Belmont } from '/imports/collection'
import { Haas } from '/imports/collection'
import { Chmer } from '/imports/collection'
import { Current } from '/imports/collection'
const fs = require('fs')
var Fiber = require('fibers')
var cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: 'turbinetechnologies',
  api_key: '433842536471938',
  api_secret: 'FdSxJtu9vJUue3497BHwjG7FR8I'
})

Meteor.publish('users', function () {
  return Meteor.users.find({}, {fields: {profile: true}})
})

Meteor.publish('Elox', function () {
  return Elox.find()           // this allows use to see or not see all post
})
Meteor.publish('Mondo', function () {
  return Mondo.find()           // this allows use to see or not see all post
})
Meteor.publish('Powersupply', function () {
  return Powersupply.find()           // this allows use to see or not see all post
})
Meteor.publish('Makino', function () {
  return Makino.find()           // this allows use to see or not see all post
})
Meteor.publish('Fanuc', function () {
  return Fanuc.find()           // this allows use to see or not see all post
})
Meteor.publish('Sodick', function () {
  return Sodick.find()           // this allows use to see or not see all post
})
Meteor.publish('Belmont', function () {
  return Belmont.find()           // this allows use to see or not see all post
})
Meteor.publish('Haas', function () {
  return Haas.find()           // this allows use to see or not see all post
})
Meteor.publish('Chmer', function () {
  return Chmer.find()           // this allows use to see or not see all post
})
Meteor.publish('Current', function () {
  return Current.find()           // this allows use to see or not see all post
})

Meteor.startup(() => {
  // code to run on server at startup
})

Meteor.methods({
  'eloxPost' (eloxInfo) {
    var newInfo = {
      text: eloxInfo.text,
      vac: eloxInfo.vac,
      serial: eloxInfo.serial,
      make: eloxInfo.make,
      number: eloxInfo.number,
      action: eloxInfo.action,
      date: new Date(),
      parent: null,
      username: Meteor.user().username,
      profileImage: Meteor.user().profile.image,
      userId: Meteor.userId()
    }
    Elox.insert(newInfo)
  },
  'removeEloxPost': function (id) {
    var rID = Elox.find({_id: id}).fetch()[0].username
    if (rID !== Meteor.user().username) {
      console.log('removal denied')
    } else {
      Elox.remove({_id: id})
    }
  },
  'removeAllElox': function () {
    Elox.remove({})
  },
  'psPost' (psinfo) {
    var psInfo = {
      psText: psinfo.text,
      psVac: psinfo.vac,
      psSerial: psinfo.serial,
      psMake: psinfo.make,
      psSide: psinfo.side,
      psDescr: psinfo.descr,
      action: psinfo.action,
      date: new Date(),
      parent: null,
      username: Meteor.user().username,
      profileImage: Meteor.user().profile.image,
      userId: Meteor.userId()
    }

    Powersupply.insert(psInfo)
  },
  'removePowersupplyPost': function (id) {
    var rID = Powersupply.find({_id: id}).fetch()[0].username
    if (rID !== Meteor.user().username) {
      console.log('removal denied')
    } else {
      Powersupply.remove({_id: id})
    }
  },
  'removeAllPowersupplyPost': function () {
    Powersupply.remove({})
  },
  'mondoPost' (mondoinfo) {
    var mondoInfo = {
      Text: mondoinfo.text,
      Vac: mondoinfo.vac,
      Serial: mondoinfo.serial,
      Make: mondoinfo.make,
      Number: mondoinfo.number,
      action: mondoinfo.action,
      date: new Date(),
      parent: null,
      username: Meteor.user().username,
      profileImage: Meteor.user().profile.image,
      userId: Meteor.userId()
    }

    Mondo.insert(mondoInfo)
  },
  'removeMondoPost': function (id) {
    var rID = Mondo.find({_id: id}).fetch()[0].username
    if (rID !== Meteor.user().username) {
      console.log('removal denied')
    } else {
      Mondo.remove({_id: id})
    }
  },
  'removeAllremoveMondoPostPost': function () {
    Mondo.remove({})
  },
  'fanucPost' (fanucinfo) {
    var fanucInfo = {
      Text: fanucinfo.text,
      Vac: fanucinfo.vac,
      Serial: fanucinfo.serial,
      Make: fanucinfo.make,
      Number: fanucinfo.number,
      action: fanucinfo.action,
      date: new Date(),
      parent: null,
      username: Meteor.user().username,
      profileImage: Meteor.user().profile.image,
      userId: Meteor.userId()
    }

    Fanuc.insert(fanucInfo)
  },
  'removeFanucPost': function (id) {
    var rID = Fanuc.find({_id: id}).fetch()[0].username
    if (rID !== Meteor.user().username) {
      console.log('removal denied')
    } else {
      Fanuc.remove({_id: id})
    }
  },
  'removeAllremoveFanucPost': function () {
    Fanuc.remove({})
  },
  'makinoPost' (makinoinfo) {
    var makinoInfo = {
      Text: makinoinfo.text,
      Vac: makinoinfo.vac,
      Serial: makinoinfo.serial,
      Make: makinoinfo.make,
      Number: makinoinfo.number,
      action: makinoinfo.action,
      date: new Date(),
      parent: null,
      username: Meteor.user().username,
      profileImage: Meteor.user().profile.image,
      userId: Meteor.userId()
    }

    Makino.insert(makinoInfo)
  },
  'removeMakinoPost': function (id) {
    var rID = Makino.find({_id: id}).fetch()[0].username
    if (rID !== Meteor.user().username) {
      console.log('removal denied')
    } else {
      Makino.remove({_id: id})
    }
  },
  'removeAllremoveMakinoPost': function () {
    Makino.remove({})
  },
  'belmontPost' (belmontinfo) {
    var belmontInfo = {
      Text: belmontinfo.text,
      Vac: belmontinfo.vac,
      Serial: belmontinfo.serial,
      Make: belmontinfo.make,
      Number: belmontinfo.number,
      action: belmontinfo.action,
      date: new Date(),
      parent: null,
      username: Meteor.user().username,
      profileImage: Meteor.user().profile.image,
      userId: Meteor.userId()
    }
    console.log(belmontInfo.Serial)
    Belmont.insert(belmontInfo)
  },
  'removeBelmontPost': function (id) {
    var rID = Belmont.find({_id: id}).fetch()[0].username
    if (rID !== Meteor.user().username) {
      console.log('removal denied')
    } else {
      Belmont.remove({_id: id})
    }
  },
  'removeAllremoveBelmontPost': function () {
    Belmont.remove({})
  },
  'sodickPost' (sodickinfo) {
    var sodickInfo = {
      Text: sodickinfo.text,
      Vac: sodickinfo.vac,
      Serial: sodickinfo.serial,
      Make: sodickinfo.make,
      Number: sodickinfo.number,
      action: sodickinfo.action,
      date: new Date(),
      parent: null,
      username: Meteor.user().username,
      profileImage: Meteor.user().profile.image,
      userId: Meteor.userId()
    }

    Sodick.insert(sodickInfo)
  },
  'removeSodickPost': function (id) {
    var rID = Sodick.find({_id: id}).fetch()[0].username
    if (rID !== Meteor.user().username) {
      console.log('removal denied')
    } else {
      Sodick.remove({_id: id})
    }
  },
  'removeAllremoveSodickPost': function () {
    Sodick.remove({})
  },
  'chmerPost' (chmerinfo) {
    var chmerInfo = {
      Text: chmerinfo.text,
      Vac: chmerinfo.vac,
      Serial: chmerinfo.serial,
      Make: chmerinfo.make,
      Number: chmerinfo.number,
      action: chmerinfo.action,
      date: new Date(),
      parent: null,
      username: Meteor.user().username,
      profileImage: Meteor.user().profile.image,
      userId: Meteor.userId()
    }

    Chmer.insert(chmerInfo)
  },
  'removeChmerPost': function (id) {
    var rID = Chmer.find({_id: id}).fetch()[0].username
    if (rID !== Meteor.user().username) {
      console.log('removal denied')
    } else {
      Chmer.remove({_id: id})
    }
  },
  'removeAllremoveChmerPost': function () {
    Chmer.remove({})
  },
  'haasPost' (haasinfo) {
    var haasInfo = {
      Text: haasinfo.text,
      Vac: haasinfo.vac,
      Serial: haasinfo.serial,
      Make: haasinfo.make,
      Number: haasinfo.number,
      action: haasinfo.action,
      date: new Date(),
      parent: null,
      username: Meteor.user().username,
      profileImage: Meteor.user().profile.image,
      userId: Meteor.userId()
    }

    Haas.insert(haasInfo)
  },
  'removeHaasPost': function (id) {
    var rID = Haas.find({_id: id}).fetch()[0].username
    if (rID !== Meteor.user().username) {
      console.log('removal denied')
    } else {
      Haas.remove({_id: id})
    }
  },
  'removeAllremoveHaasPost': function () {
    Haas.remove({})
  },
  'currentPost' (currentinfo) {
    var currentInfo = {
      Text: currentinfo.text,
      Vac: currentinfo.vac,
      Serial: currentinfo.serial,
      Make: currentinfo.make,
      Number: currentinfo.number,
      action: currentinfo.action,
      date: new Date(),
      parent: null,
      username: Meteor.user().username,
      profileImage: Meteor.user().profile.image,
      userId: Meteor.userId()
    }

    Current.insert(currentInfo)
  },
  'removeCurrentPost': function (id) {
    var rID = Current.find({_id: id}).fetch()[0].username
    if (rID !== Meteor.user().username) {
      console.log('removal denied')
    } else {
      Current.remove({_id: id})
    }
  },
  'removeAllremoveCurrentPost': function () {
    Current.remove({})
  },
  'profileUpdate': function (result) {
    const user = Meteor.user()
    Meteor.users.update(
        {_id: user._id},
      {$set: {'profile.image': result[0].url}
      })
  }
})
