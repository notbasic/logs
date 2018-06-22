var moment = require('moment')

Template.belmontM.helpers({
  formattedDate: function () {
    return moment(this.date, 'M/D/YYYY  h:mm:ss', true).format()
  }
})
