/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */



// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.

// function myEventHandler() {
//     "use strict" ;
// // ...event handler code here...
// }

var DELAY = 1000;
var DELAYMULTIPLIER = 2;
var YROTATION = 1.5;
var materialsReady = false;
var previousSubPage = false;
var userData = [];
var currency = "";
var rate = 0;
var firstTime = true;
var loader = false;
var LANG = "en";
var messages;

// ...additional event handlers here...
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.iOS());
    }
};

var notification = {
    "alert": function (message, type, title, buttons, code) {
        swal({
            title: title,
            text: message,
            confirmButtonText: buttons,
            type: type
        });
    },
    "confirm": function (message, callback, title, buttonText, code) {
        swal({
            title: title,
            text: message,
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: buttonText,
            closeOnConfirm: true
        }, function () {
            callback();
        });
    }
};


function showLoader() {
    if (loader == false) {
        loader = true;
        waitingDialog.show('Processing..', {
            dialogSize: 'sm'
        });
    }
    //    $('body').addClass('ui-disabled');
}


function hideLoader() {
    if (loader == true) {
        loader = false
        waitingDialog.hide();
    }
}

Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}


function formatDate(date) {
    var dateFormat = new Date(date);
    var yyyy = dateFormat.getFullYear();
    var mm = dateFormat.getMonth() + 1;
    var dd = dateFormat.getDate();

    if (mm <= 9) {
        mm = "0" + mm;
    }
    if (dd <= 9) {
        dd = "0" + dd;
    }

    dateFormat = yyyy + "-" + mm + "-" + dd;
    return dateFormat;
}

function formatTimeStamp(ts) {
    ts = new Date(ts);
    var yyyy = ts.getFullYear();
    var mm = ts.getMonth() + 1;
    var dd = ts.getDate();
    var hh = ts.getHours();
    var mins = ts.getMinutes();
    var ss = ts.getSeconds();

    if (mm <= 9) {
        mm = "0" + mm;
    }

    if (dd <= 9) {
        dd = "0" + dd;
    }

    if (hh <= 9) {
        hh = "0" + hh;
    }

    if (mins <= 9) {
        mins = "0" + mins;
    }

    if (ss <= 9) {
        ss = "0" + ss;
    }

    ts = yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mins + ":" + ss;

    return ts;
}

//Custom knockout binding to fix jqm checkbox problem
ko.bindingHandlers.jqmChecked = {
    init: ko.bindingHandlers.checked.init,
    update: function (element, valueAccessor) {
        //KO v3 and previous versions of KO handle this differently
        //KO v3 does not use 'update' for 'checked' binding
        if (ko.bindingHandlers.checked.update)
            ko.bindingHandlers.checked.update.apply(this, arguments); //for KO < v3, delegate the call
        else
            ko.utils.unwrapObservable(valueAccessor()); //for KO v3, force a subscription to get further updates

        if ($(element).data("mobile-checkboxradio")) //calling 'refresh' only if already enhanced by JQM
            $(element).checkboxradio('refresh');
    }
};

(function () {
    // Convert array to object
    var convArrToObj = function (array) {
        var thisEleObj = new Object();
        if (typeof array == "object") {
            for (var i in array) {
                var thisEle = convArrToObj(array[i]);
                thisEleObj[i] = thisEle;
            }
        } else {
            thisEleObj = array;
        }
        return thisEleObj;
    };
    var oldJSONStringify = JSON.stringify;
    JSON.stringify = function (input) {
        return oldJSONStringify(convArrToObj(input));
    };
})();

function updateFBStatusCallback(response) {
    console.log("FB Connected" + response);
}

function message(lang, code) {
    var msg = "";
    if (lang.toUpperCase() == "EN") {
        msg = findEnMsg(code);
    }
    return message;
}

function loadMessages(lang) {
    if (lang.toUpperCase() == "EN") {
        messages = JSON.parse("/js/enMessages.json")
    }
}
