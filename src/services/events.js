var events = require('events');
var em = new events.EventEmitter();

const EVENTS = {
    DUPLICATE_FUND_WARNING: "duplicate_fund_warning"

}

module.exports.commonEmitter = em;
module.exports.EVENTS = EVENTS;