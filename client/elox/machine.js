var moment = require('moment')

Template.machine.helpers({
  formattedDate: function () {
    return moment(this.date, 'M/D/YYYY  h:mm:ss', true).format()
  }
})
