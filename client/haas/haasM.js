var moment = require('moment')

Template.haasM.helpers({
  formattedDate: function () {
    return moment(this.date, 'M/D/YYY  h:mm:ss', true).format()
  }
})
