"use strict";

var moment = require("moment");

function timeFunction() {
    console.log('timeFunction');
}

module.exports = {

    timeFunction: function() {
        timeFunction();
    }
};
