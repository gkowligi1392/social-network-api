const moment = require("moment");

// Short Date format dd/mm/yyyy hh:mm:ss
function shortDateFormat(date) {
    return moment(date).format("DD/MM/YYYY HH:mm:ss");
}

module.exports = {
    shortDateFormat,
};
