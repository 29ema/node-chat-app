const moment = require ('moment');



var someTimestamp= moment().valueOf();
console.log(moment(new Date()).valueOf());

var createdAt=1234;
var date =moment(createdAt);

console.log(date.format("H:mm a"));

module.exports={ };