var common = require('../services/events');
const {EVENTS} = require("../services/events");
var commonEmitter = common.commonEmitter;


module.exports.initiateListeners = ()=>{
    commonEmitter.on(EVENTS.DUPLICATE_FUND_WARNING, function (data) {
        console.log('A duplicate alias was found, log data to DB');
    });
};