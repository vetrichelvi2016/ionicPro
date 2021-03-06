/// <reference path="app.js" />

var snap = snap || {};

kendo.data.binders.onEnterKey = kendo.data.Binder.extend({
    init: function(element, bindings, options) {
        kendo.data.Binder.fn.init.call(this, element, bindings, options);
        var that = this;
        $(that.element).on("keypress", function(event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                that.bindings["onEnterKey"].get();
                event.preventDefault();
            }
        });
    },
    refresh: function() {}
});

kendo.data.binders.onEnterNewLine = kendo.data.Binder.extend({
    init: function(element, bindings, options) {
        kendo.data.Binder.fn.init.call(this, element, bindings, options);
        var that = this;
        $(that.element).on("keypress", function(event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '13') {
                $(this).val($(this).val() + "\n");
                event.preventDefault();
            }
        });
    },
    refresh: function() {}
});

kendo.data.binders.geoAddressInput = kendo.data.Binder.extend({
    init: function(element, bindings, options) {
        var that = this;
        kendo.data.Binder.fn.init.call(this, element, bindings, options);
        try {
            var autocomplete = new google.maps.places.Autocomplete(element);
            autocomplete.addListener('place_changed', function() {
                var place = autocomplete.getPlace().formatted_address;
                if (place) {
                    var commaIndex = place.indexOf(",");
                    var address = place.substring(0, commaIndex + 1) + "\n" + place.substring(commaIndex + 1, place.length + 1);
                    element.value = address;

                    that.change(address);
                }
            });
        } catch (ex) {
            console && console.log(ex);
        }
    },
    change: function(address) {
        this.bindings["value"].set(address); //update the View-Model
    },

    refresh: function() {}
});


kendo.data.binders.class = kendo.data.Binder.extend({
    init: function(target, bindings, options) {
        kendo.data.Binder.fn.init.call(this, target, bindings, options);

        // get list of class names from our complex binding path object
        this._lookups = [];
        for (var key in this.bindings.class.path) {
            if (this.bindings.class.path.hasOwnProperty(key)) {
                this._lookups.push({
                    key: key,
                    path: this.bindings.class.path[key]
                });
            }
        }
    },

    refresh: function() {
        var lookup,
            value;

        for (var i = 0; i < this._lookups.length; i++) {
            lookup = this._lookups[i];

            // set the binder's path to the one for this lookup,
            // because this is what .get() acts on.
            this.bindings.class.path = lookup.path;
            value = this.bindings.class.get();

            // add or remove CSS class based on if value is truthy
            if (value) {
                $(this.element).addClass(lookup.key);
            } else {
                $(this.element).removeClass(lookup.key);
            }
        }
    }
});


kendo.data.binders.rmclass = kendo.data.Binder.extend({
    init: function(target, bindings, options) {
        kendo.data.Binder.fn.init.call(this, target, bindings, options);

        // get list of class names from our complex binding path object
        this._lookups = [];
        for (var key in this.bindings.rmclass.path) {
            if (this.bindings.rmclass.path.hasOwnProperty(key)) {
                this._lookups.push({
                    key: key,
                    path: this.bindings.rmclass.path[key]
                });
            }
        }
    },

    refresh: function() {
        var lookup,
            value;

        for (var i = 0; i < this._lookups.length; i++) {
            lookup = this._lookups[i];

            // set the binder's path to the one for this lookup,
            // because this is what .get() acts on.
            this.bindings.rmclass.path = lookup.path;
            value = this.bindings.rmclass.get();

            // add or remove CSS class based on if value is truthy
            if (!value) {
                $(this.element).addClass(lookup.key);
            } else {
                $(this.element).removeClass(lookup.key);
            }
        }
    }
});


kendo.data.binders.snapDateTime = kendo.data.Binder.extend({
    init: function(element, bindings, options) {
        kendo.data.Binder.fn.init.call(this, element, bindings, options);
    },
    refresh: function() {
        var data = this.bindings["snapDateTime"].get();
        if (data) {
            var dateObj = new Date(data);
            $(this.element).text(SnapDateTime1(dateObj));
        }
    }
});
kendo.data.binders.snapDateTimeShort = kendo.data.Binder.extend({
    init: function(element, bindings, options) {
        kendo.data.Binder.fn.init.call(this, element, bindings, options);
    },
    refresh: function() {
        var data = this.bindings["snapDateTimeShort"].get();
        if (data) {
            var dateObj = new Date(data);
            $(this.element).text(SnapDateTimeShort(dateObj));
        }
    }
});
kendo.data.binders.snapDate1 = kendo.data.Binder.extend({
    init: function(element, bindings, options) {
        kendo.data.Binder.fn.init.call(this, element, bindings, options);
    },
    refresh: function() {
        var data = this.bindings["snapDate1"].get();
        if (data) {
            var dateObj = new Date(data);
            $(this.element).text(formatJSONDate1(dateObj));
        }
    }
});
kendo.data.binders.snapDateShort = kendo.data.Binder.extend({
    init: function(element, bindings, options) {
        kendo.data.Binder.fn.init.call(this, element, bindings, options);
    },
    refresh: function() {
        var data = this.bindings["snapDateShort"].get();
        if (data) {
            var dateObj = new Date(data);
            $(this.element).text(formatJSONDateShort(dateObj));
        }
    }
});
kendo.data.binders.widget.max = kendo.data.Binder.extend({
    init: function(widget, bindings, options) {
        //call the base constructor
        kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
    },
    refresh: function() {
        var that = this,
            value = that.bindings["max"].get(); //get the value from the View-Model

        var dd = $(that.element).data("kendoDatePicker"); //.max(value); //update the widget
        if (dd) {
            dd.max(value);
        }
    }
});

kendo.data.binders.widget.min = kendo.data.Binder.extend({
    init: function(widget, bindings, options) {
        //call the base constructor
        kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
    },
    refresh: function() {
        var that = this,
            value = that.bindings["min"].get(); //get the value from the View-Model
        var dd = $(that.element).data("kendoDatePicker"); //.min(value); //update the widget
        if (dd) {
            dd.min(value);
        }
    }
});

kendo.data.binders.ageString = kendo.data.Binder.extend({
    init: function(element, bindings, options) {
        kendo.data.Binder.fn.init.call(this, element, bindings, options);
    },
    refresh: function() {
        var data = this.bindings["ageString"].get();
        if (data) {
            $(this.element).text(snap.getAgeString(data));
        }
    }
});

kendo.data.binders.slide = kendo.data.Binder.extend({
    refresh: function() {
        var value = this.bindings["slide"].get();
        var speed = $(this.element).data("slide-speed") || 400;

        if (value) {
            $(this.element).slideDown(speed);
        } else {
            $(this.element).slideUp(speed);
        }
    }
});

kendo.data.binders.fade = kendo.data.Binder.extend({
    refresh: function() {
        var value = this.bindings["fade"].get();
        var speed = $(this.element).data("fade-speed") || 400;

        if (value) {
            $(this.element).fadeIn(speed);
        } else {
            $(this.element).fadeOut(speed);
        }
    }
});
kendo.data.binders.snapPhoneNumber = kendo.data.Binder.extend({
    init: function(element, bindings, options) {
        kendo.data.Binder.fn.init.call(this, element, bindings, options);
    },
    refresh: function() {
        var data = this.bindings["snapPhoneNumber"].get();
        if (data) {
            $(this.element).text(snap.formatPhoneNumber(data));
        }
    }
});

/***
Contains OS related JS functions
***/

var isMobile = {

    Android: function() {
        var ua = navigator.userAgent;
        return ua.match(/Android/i) ||
            ua.match(/Dalvik/i) ||
            ua.match(/GINGERBREAD/i) ||
            ua.match(/LOLLIPOP/i) ||
            ua.match(/Linux;.*Mobile Safari/) ||
            ua.match(/Linux 1\..*AppleWebKit/);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function isMacChrome64Bit() {
    //Anything mac chrome 39 and over is 64 bit.
    if ((navigator.appVersion.indexOf("Macintosh") != -1) &&
        (get_browser() == "Chrome") && (get_browser_version() > 38))
        return true;

    return false;

}

function isMacNon64Bit() {
    //Checks if not Chrome or version less than 38 but should be Mac.
    if (((get_browser() != "Chrome") || (get_browser_version() < 38)) &&
        (navigator.appVersion.indexOf("Macintosh") != -1)) {
        return true;
    }
    return false;
}

function GetOS() {
    if (navigator.appVersion.toLowerCase().indexOf('ipad') >= 0) {
        return 'ipad';
    } else if (navigator.appVersion.toLowerCase().indexOf('macintosh') >= 0) {
        return 'macintosh';
    } else if (navigator.appVersion.toLowerCase().indexOf('windows') >= 0) {
        return 'windows';
    } else {
        return 'notavailable';
    }

}

function ValidateOS() {
    if (navigator.appVersion.toLowerCase().indexOf('ipad') >= 0) {
        return true;
    }

    if (isMobile.iOS()) {
        return true;
    }

    if (isMobile.Android()) {
        return true;
    }

    if (navigator.appVersion.toLowerCase().indexOf('macintosh') >= 0) {
        return true;
    }

    if (navigator.appVersion.toLowerCase().indexOf('windows') >= 0) {
        return true;
    }

    return false;
}
var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
var isFirefox = typeof InstallTrigger !== 'undefined'; // Firefox 1.0+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
// At least Safari 3+: "[object HTMLElementConstructor]"
var isChrome = !!window.chrome && !isOpera; // Chrome 1+
var isIE = /*@cc_on!@*/ false || !!document.documentMode; // At least IE6



function screenSharingExtLink() {
    if (isChrome) {
        window.open("https://chrome.google.com/webstore/detail/connected-care-screen-sha/padchhoieclaaocgjbfepahaakajgllb");
    } else if (isFirefox) {
        window.open("https://addons.mozilla.org/en-US/firefox/addon/screen-sharing-extension-for-s/");
    }

}


function goToApp(appLocation) {
    setTimeout(function() {
        window.location = appLocation;
    }, 25);
}


function isBrowser64Bit() {

    if (navigator.userAgent.indexOf('WOW64') > -1 || window.navigator.platform == 'Win64')
        return true;
    return false;
}

function get_browser() {
    var ua = navigator.userAgent,
        tem, M = ua.match(/(opera|chrome|safari|firefox|edge|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/)
        if (tem != null) { return 'Opera ' }
        tem = ua.match(/edge\/(\d+)/i)
        if (tem != null) { return 'Edge'; }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
    return M[0];
}

function get_browser_version() {
    var ua = navigator.userAgent,
        tem, M = ua.match(/(opera|chrome|safari|firefox|edge|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/)
        if (tem != null) { return tem[1]; }
        tem = ua.match(/edge\/(\d+)/i)
        if (tem != null) { return tem[1]; }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
    return M[1];
}

function showRecommendedBrowser() {
    if (localStorage.showRecommendedBrowser == 'false') {
        return false;
    }

    var browserName = get_browser();
    var envVer = get_browser_version();

    //Chrome
    if (browserName == "Chrome") {
        if (envVer >= snap.utilities.browsers.chrome) {
            return false;
        } else {
            showRecommendedBrowser.isVersion = true;
            return true;
        }
    }
    //Firefox
    if (browserName == "Firefox") {
        if (envVer >= snap.utilities.browsers.firefox) {
            return false;
        } else {
            showRecommendedBrowser.isVersion = true;
            return true;
        }
    }

    //maybe also check mobile options

    if (isMobile.any()) {
        return false;
    }
    var width = $(window).width();
    if (width <= 720) {
        return false;
    }
    return true;
}
/* Helper function to get Script and evel */
var snap = snap || {};

snap.getScript = snap.getScript || function(url, options) {

    options = options || {};
    var cache = true;
    if (options.cache) {
        cache = options.cache;
    }

    if ((cache) && (url.indexOf("v=1694") < 0)) {
        if (url.indexOf("?") >= 0) {
            url = url + "&v=1694";
        } else {
            url = url + "?v=1694";
        }
    }

    options = $.extend(options, {
        dataType: "script",
        cache: cache,
        url: url
    });
    return jQuery.ajax(options);
};


var onSnapNotification = function(e) {
    e.element.parent().css({
        zIndex: 20004
    });

};
snap.regExMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

window.addEventListener("beforeunload", function(event) {
    snap.isUnloading = true;
    return null;
});


$(document).ajaxSend(function(e, jqxhr, settings) {

    var isApi = false;
    if (/^\//.test(settings.url))
        isApi = true;
    if (/^http[s]?:\/\/[^\/]+\/api/.test(settings.url))
        isApi = true;
    if (snap && isApi && snap.userSession) {
        if ((snap.userSession.token) && (!(settings.headers && settings.headers.Authorization))) {

            if (snap.userSession.isGuest) {
                jqxhr.setRequestHeader("Authorization", "JWT-Participant " + snap.userSession.token);
            } else {
                jqxhr.setRequestHeader("Authorization", "Bearer " + snap.userSession.token);
            }

        }

        //legacy api keys path check
        if (!snap.userSession.apiDeveloperId && snap.apiDeveloperId) {
            snap.userSession.apiDeveloperId = snap.apiDeveloperId;
        }
        if (!snap.userSession.apiKey && snap.apiKey) {
            snap.userSession.apiKey = snap.apiKey;
        }


        if (snap.userSession.apiDeveloperId)
            jqxhr.setRequestHeader("X-Developer-Id", snap.userSession.apiDeveloperId);
        if (snap.userSession.apiKey)
            jqxhr.setRequestHeader("X-Api-Key", snap.userSession.apiKey);
        if (snap.userSession.timeZoneSystemId)
            jqxhr.setRequestHeader("Time-Zone", snap.userSession.timeZoneSystemId);
    } else if (snap && isApi && snap.apiDeveloperId && snap.apiKey) {
        jqxhr.setRequestHeader("X-Developer-Id", snap.apiDeveloperId);
        jqxhr.setRequestHeader("X-Api-Key", snap.apiKey);
    }
});

snap.submitForm = function(config, data) {
    var form = $('<form>', {
        'action': config.url,
        'method': config.method
    });
    $.each(data, function(name, value) {
        form.append($('<input>', {
            'name': name,
            'value': value,
            'type': 'hidden'
        }));
    });
    form.appendTo('body').submit();

};

function initializeAddressInputs() {
    $("span.addressHintText").text("Street, Apt/Unit #, City, State/Province, Zip/Postal Code"); /*hint text*/
    $(".addressPlaceholder").attr("placeholder", "Full Address"); /*Placeholder*/
}

function isEmpty(obj) {
    if (typeof obj == 'undefined' || obj === null || obj === '')
        return true;
    if (typeof obj == 'number' && isNaN(obj))
        return true;
    if (obj instanceof Date && isNaN(Number(obj)))
        return true;
    return false;
}

function removePhoneFormat(phoneNumber) {
    phoneNumber = $.trim(phoneNumber);
    if (phoneNumber !== null) {
        var isPlus = false;
        if (phoneNumber.indexOf("+") > -1)
            isPlus = true;
        var result = phoneNumber.trim().replace(/[^0-9]+/gi, '');
        if (isPlus)
            result = "+" + result;
        return result;
    } else
        return '';
}

function getNumbersFromString(string) {
    if (string !== null) {
        string = $.trim(string);
        return string.replace(/[^0-9]+/gi, '');
    } else
        return string;
}

function formatJSONDate1(jsonDate) {

    var mon, day, monthname;
    var newDate;
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (jsonDate != null) {
        var value = jsonDate;
        if (typeof value !== "string" || value.substring(0, 6) == "/Date(") {
            if (typeof value === "string")
                newDate = new Date(parseInt(value.substring(6, value.length - 2)));
            else
                newDate = new Date(value);
            mon = newDate.getUTCMonth();
            monthname = month[mon];
            if (newDate.getUTCDate() < 10)
                day = '0' + newDate.getUTCDate();
            else
                day = newDate.getUTCDate();
            return (monthname + " " + day + ", " + newDate.getUTCFullYear());
        } else {
            var newYear = value.substring(0, 4);
            mon = value.substring(5, 7);
            monthname = month[parseInt(mon - 1)];
            day = value.substring(8, 10);

            return (monthname + " " + day + ", " + newYear);
        }

    } else
        return '';
}

function formatJSONDateShort(jsonDate) {

    var mon, day;
    var newDate;
    if (jsonDate != null) {
        var value = jsonDate;
        if (typeof value !== "string" || value.substring(0, 6) == "/Date(") {
            if (typeof value === "string")
                newDate = new Date(parseInt(value.substring(6, value.length - 2)));
            else
                newDate = new Date(value);
            mon = newDate.getUTCMonth() + 1;

            if (newDate.getUTCDate() < 10)
                day = '0' + newDate.getUTCDate();
            else
                day = newDate.getUTCDate();
            return (mon + "/" + day + "/" + newDate.getUTCFullYear());
        } else {
            var newYear = value.substring(0, 4);
            mon = value.substring(5, 7);
            day = value.substring(8, 10);

            return (mon + "/" + day + "/" + newYear);
        }

    } else
        return '';
}

function SnapDateTime1(jsonDate) {
    return formatJSONDate1(jsonDate) + ' ' + GetFormattedTimeFromTimeStamp(jsonDate);
}

function SnapDateTimeShort(jsonDate) {
    return formatJSONDateShort(jsonDate) + ' ' + GetFormattedTimeFromTimeStamp(jsonDate);
}

function GetFormattedTimeFromTimeStamp(jsonDate) {
    var value = jsonDate;
    var hours;
    var mins;
    if (typeof value !== "string" || value.substring(0, 6) == "/Date(") {
        var time;
        if (typeof value === "string")
            time = new Date(parseInt(value.substring(6, value.length - 2)));
        else
            time = new Date(value);

        hours = time.getUTCHours();
        mins = time.getUTCMinutes();
    } else {
        hours = parseInt(value.substring(11, 13));
        mins = parseInt(value.substring(14, 16));
    }
    var ampm = 'AM';
    if (hours >= 12) {
        ampm = 'PM';
    }
    if (hours > 12) {
        hours -= 12;
    }
    if (hours === 0)
        hours = 12;
    if (mins < 10) {
        mins = '0' + mins;
    }
    return hours + ':' + mins + ' ' + ampm;
}

function GetSnap24HourTime(jsonDate) {
    var value = jsonDate;
    var hours;
    var mins;
    if (typeof value !== "string" || value.substring(0, 6) == "/Date(") {
        var time;
        if (typeof value === "string")
            time = new Date(parseInt(value.substring(6, value.length - 2)));
        else
            time = new Date(value);
        hours = time.getUTCHours();
        mins = time.getUTCMinutes();
    } else {
        hours = parseInt(value.substring(11, 13));
        mins = parseInt(value.substring(14, 16));
    }

    if (mins < 10) {

        mins = "0" + mins;
    }
    return hours + ":" + mins;

}

function logError(MessageOrigin, MessageType, Message, Recommendation) {
    var payload = {
        MessageOrigin: "snap.common.js: " + MessageOrigin,
        MessageType: MessageType,
        Message: Message ? Message.toString().replace(/'/g, "\\'") : null,
        Recommendation: Recommendation ? Recommendation.toString().replace(/'/g, "\\'") : null
    };

    // Todo: Add userId and IP address to payload.
    $.ajax({
        type: "POST",
        url: '/api/v2.1/log-messages',
        data: JSON.stringify(payload),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(function(response) {
        sessionStorage.setItem('lastErrorId', response.data[0].id);
        location.href = "/public/#/error/";
    }).fail(function() {
        location.href = "/public/#/error/";
    });


}



var snapSuccess = function(message) {
    snap.SnapNotification().success(message);
};

var snapSuccessHtml = function(message) {
    snap.SnapNotification().successHtml(message);
};

var snapError = function(message) {
    snap.SnapNotification().error(message);
};

var snapInfo = function(message) {
    snap.SnapNotification().info(message);
};
var snapAnnouncement = function(message) {
    snap.SnapNotification().announcement(message);
};

var snapSetInterval = function(fn, time) {
    var _isStop = false;
    (function() {
        if (!_isStop) {
            fn();
            setTimeout(arguments.callee, time);
        }
    }());

    return function() {
        _isStop = true;
    };
};








var snapRemoveErrorNotification = function() {
    $(".snapError").parent().parent().remove();
};

var showSnapConfirmation = (function() {

    var confirmationGlobal = $("<span>").kendoNotification({
        pinned: true,
        position: {
            top: 30,
            right: 30
        },
        stacking: "down",
        autoHideAfter: 0,
        hideOnClick: true,
        button: true,
        templates: [{
                type: "confirmation",
                template: "<div class='snapInfo'><span class='icon_new'></span><h3>Confirmation:</h3><p>  #= content #  </p></div>" +
                    "<div><span id='btnConfirmNo'  class='confirm-btnNo' style='float:right'>No</span>" +
                    "<span id='btnConfirmYes'  class='confirm-btnYes' style='float:left'>Yes</span></div>"
            }

        ],
        show: onSnapNotification
    }).data("kendoNotification");

    return function(msg, type) {
        confirmationGlobal.show(msg, type);
    };
})();
var snapConfirm = function(message) {
    showSnapConfirmation(message, "confirmation");
};
var showSnapAlert = (function() {

    var confirmationGlobal = $("<span>").kendoNotification({
        pinned: true,
        position: {
            top: 30,
            right: 30
        },
        stacking: "down",
        autoHideAfter: 0,
        hideOnClick: false,
        modal: true,
        button: true,
        show: onSnapNotification,
        templates: [{
            type: "confirmation",
            template: "<div class='snapInfo'><span class='icon_new'></span><h3>Confirmation:</h3><p> #: content # </p></div>" +
                "<span id='btnAlertOk'  class='confirm-btnYes center'>Ok</span>"
        }]
    }).data("kendoNotification");

    return function(msg, type) {
        confirmationGlobal.show(msg, type);
    };
})();

$(document).ready(function() {
    $(".phoneNumberFormat").each(function() {
        var phoneNumber = $(this).data("phone-format");
        var phoneText = $(this).html();
        var formatedPhoneNumber = formatPhoneNumber(phoneNumber);
        $(this).html(phoneText.replace(phoneNumber, "") + formatedPhoneNumber);
    });
    initializeAddressInputs();


});




function sortResults(data, prop, asc) {
    if (data && data != 'undefined') {
        data = data.sort(function(a, b) {
            if (asc)
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            else
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
        });
    }
    return data;
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

function textValidate(e) {
    if (e.shiftKey || e.ctrlKey || e.altKey) {
        e.preventDefault();
    } else {
        var key = e.keyCode;
        if (!((key == 8) || (key == 9) || (key == 46) || (key >= 35 && key <= 40) || (key >= 48 && key <= 57) || (key >= 96 && key <= 105))) {
            e.preventDefault();
        }
    }
}

function initializeToolTip(className) {
    $("." + className).kendoTooltip({
        width: 250,
        position: "top"
    }).data("kendoTooltip");
}


/** @namespace */
snap.string = (function() {

    'use strict';

    return {
        /**
         * @method format
         * @public
         * @description format string behaves like ASP String.Format
         * @memberof snap.string
         * @param {string} string -  String to be formatted
         * @param {string} values - values to be insterted
         * @returns {string} formatted string
         * @example
         * //returns "Hello World"
         * snap.string.format('{0} {1}', 'Hello', 'World');
         */
        format: function() {
            var args = Array.prototype.slice.call(arguments), //convert arguments into a js array
                str = args.shift(); //first argument is the string, rest are placeholders

            for (var i = 0, l = args.length; i < l; i++) {
                var regexp = new RegExp('\\{' + i + '\\}', 'gi');
                str = str.replace(regexp, args[i]);
            }

            return str;
        },
        formatURIComponents: function() {
            var args = Array.prototype.slice.call(arguments), //convert arguments into a js array
                str = args.shift(); //first argument is the string, rest are placeholders
            for (var i = 0, l = args.length; i < l; i++) {
                var regexp = new RegExp('\\{' + i + '\\}', 'gi');
                str = str.replace(regexp, encodeURIComponent(args[i]));
            }

            return str;
        },
        formatUSPhone: function(phoneNum) {
            var displayph = phoneNum.replace(/[^0-9]/g, '');
            displayph = displayph.replace(/^1/, '');
            if (displayph.length === 10) {
                displayph = displayph.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3");
                return displayph;
            }
            return phoneNum;
        },
        formatHtml: function() {
            var args = Array.prototype.slice.call(arguments), //convert arguments into a js array
                str = args.shift(); //first argument is the string, rest are placeholders

            for (var i = 0, l = args.length; i < l; i++) {
                var regexp = new RegExp('\\{' + i + '\\}', 'gi');
                str = str.replace(regexp, $('<div/>').text(args[i]).html());
            }

            return str;
        },
        formatString: function() {
            var pattern = /\{([^\{\}]*)\}/g;
            var values = Array.prototype.slice.call(arguments), //convert arguments into a js array
                template = values.shift(); //first argument is the string, rest are placeholders

            if ($.isPlainObject(arguments[1])) {
                values = arguments[1];
            }
            return template.replace(pattern, function(a, b) {
                var p = b.split('.'),
                    r = values;
                try {
                    for (var s in p) { r = r[p[s]]; }
                } catch (e) {
                    r = a;
                }
                return (typeof r === 'string' || typeof r === 'number') ? r : a;
            });
        },

        /**
         * @method template
         * @public
         * @description formats string template with values
         * @memberof snap.string
         * @param {string} tmpl -  template to be formatted
         * @param {object} values - values in object literal format
         * @returns {string} formatted template
         * @example
         * //returns &lt;div id="User_1">John Smith&lt;/div>
         * snap.string.template('$lt;div id="User_{id}">{firstName} {lastName}&lt;/div>', {id: 1, firstName:'John', lastName: 'Smith'});
         */
        template: function(tmpl, obj) {
            if (typeof obj !== 'object') {
                return tmpl;
            }
            for (var propertyName in obj) {
                var re = new RegExp('{' + propertyName + '}', 'gm');
                tmpl = tmpl.replace(re, obj[propertyName]);
            }

            return tmpl;
        },
        /**
         * @method getPagePath
         * @public
         * @description returns page path for a named service
         * @memberof snap.string
         * @param {string} page - name of page
         * @returns {string} path - path of service
         * @example
         * //returns /Customer/PatientService.asmx
         * snap.string.getPagePath('CustomerPage');
         */
        getPagePath: function(page) {
            return snap.paths[page] || '';
        }
    };
}());

function getDefaultProfileImageForClinician(gender) {
    return gender === "F" ?
        "images/Doctor-Female.gif" :
        gender === "M" ?
        "images/Doctor-Male.gif" :
        "images/default-user.jpg";
}

function getDefaultProfileImageForPatient(gender) {
    return gender === "F" ?
        "images/Patient-Female.gif" :
        gender === "M" ?
        "images/Patient-Male.gif" :
        "images/default-user.jpg";
}

function isDefaultProfileImageForPatient(imageUrl) {
    return imageUrl === "images/Patient-Female.gif" ||
        imageUrl === "images/Patient-Male.gif" ||
        imageUrl === "images/default-user.jpg";
}


var ProfileImageUploader;

(function() {
    var uploadMaxSizeBytes = 4194304;

    var uploadUrlPrefixes = {
        "patient": "/api/v2.1/patients/profile-images?patientId=",
        "clinician": "/api/v2.1/clinicians/profile-images?clinicianUserId=",
        "provider": "/api/v2.1/providers/profile-images?hospitalId=",
        "image": "/api/v2.1/images "
    };

    ProfileImageUploader = function($input, uploaderType, autoUploadEnabled, profileId, onImageSelected, onImageUploaded) {
        var uploaderInstance = this;

        var uploadUrl = createUploadUrl(uploaderType, profileId);
        $input.kendoUpload(buildKendoUploadOptions(uploadUrl, autoUploadEnabled, onSelect, onUpload, onSuccess, onError, onCancel));

        function onSelect(e) {
            var isValid = validateFileSelection(e);
            if (!isValid) {
                return;
            }
            if (!autoUploadEnabled) {
                tryReadFileLocally(e, onImageSelected);
            }
        };

        function onUpload(e) {
            var xhr = e.XMLHttpRequest;

            if (!xhr) {
                e.preventDefault();
                snapError("Upload failed. System error.");
                return;
            }
            setAuthHeaders(xhr);
            hideUploadButton($input);
        };

        function onSuccess(e) {
            var url = e.XMLHttpRequest.getResponseHeader("Location");

            if (onImageUploaded) {
                onImageUploaded(url);
            }

            resetUploader($input, true);

            if (uploaderInstance.__uploadDefer) {
                uploaderInstance.__uploadDefer.resolve(url);
            }
        };

        function onError(e) {
            snapError(e.XMLHttpRequest.statusText || "Upload failed");
            if (uploaderInstance.__uploadDefer) {
                uploaderInstance.__uploadDefer.fail();
            }
            resetUploader($input, false);
        };

        function onCancel(e) {
            e.preventDefault();
            if (uploaderInstance.__uploadDefer) {
                uploaderInstance.__uploadDefer.fail();
            }
            resetUploader($input, false);
        };

        uploaderInstance.updateSaveUrl = function(id) {
            if (!id && uploaderType !== "image") {
                throw "Profile ID must be set";
            }
            $input.data("kendoUpload").options.async.saveUrl = createUploadUrl(uploaderType, id);
        };

        uploaderInstance.uploadAsync = function(id) {
            if (!id && uploaderType !== "image") {
                throw "Profile ID must be set";
            }
            $input.data("kendoUpload").options.async.saveUrl = createUploadUrl(uploaderType, id);

            uploaderInstance.__uploadDefer = new $.Deferred();

            var uploadButton = $(".k-upload-selected");
            if (uploadButton.length) {
                uploadButton.click();
            } else {
                uploaderInstance.__uploadDefer.resolve();
            }

            return uploaderInstance.__uploadDefer.promise();
        }
    };

    /**
     * @returns {Boolean} is valid selection
     */
    function validateFileSelection(e) {

        if (e.files.length === 0) {
            e.preventDefault();
            snapError("No file selected.");
            return false;
        }

        var anyFileHasInvalidFormat = $(e.files).is(function(i) {
            if (!/^\.(jpg|png|jpeg|gif)$/i.test(e.files[i].extension || "")) {
                return true;
            }
            return false;
        });

        if (anyFileHasInvalidFormat) {
            e.preventDefault();
            snapError("Invalid file format. The system can accept the following file formats: JPG, JPEG, PNG, GIF.");
            return false;
        }

        var anyFileIsBiggerThanAllowed = $(e.files).is(function(i) {
            return e.files[i].size > uploadMaxSizeBytes;
        });

        if (anyFileIsBiggerThanAllowed) {
            e.preventDefault();
            snapError("Uploaded files must be less than 4MB.");
            return false;
        }

        return true;
    }

    function buildKendoUploadOptions(uploadUrl, autoUploadEnabled, onSelect, onUpload, onSuccess, onError, onCancel) {
        return {
            async: {
                autoUpload: autoUploadEnabled,
                saveUrl: uploadUrl
            },
            multiple: false,
            localization: {
                select: autoUploadEnabled ? "Upload image" : "Select image",
                headerStatusUploading: "Saving...",
                headerStatusUploaded: "Profile image saved"
            },
            showFileList: !autoUploadEnabled && !FileReader,
            template: "<span title=\"#=name#\">#=name#</span>",
            select: onSelect,
            upload: onUpload,
            success: onSuccess,
            error: onError,
            cancel: onCancel
        };
    }

    function createUploadUrl(uploaderType, uploaderId) {
        var uploadUrlPrefix = uploadUrlPrefixes[uploaderType];

        if (typeof uploadUrlPrefix === "undefined") {
            throw "Incorrect uploader type '" + uploaderType + "'";
        }

        return uploadUrlPrefix + (uploaderId || "");
    }

    function tryReadFileLocally(e, onImageSelected) {
        if (FileReader && onImageSelected) {
            var reader = new FileReader();

            reader.addEventListener("load", function() {
                onImageSelected(this.result);
            }, false);

            reader.readAsDataURL(e.files[0].rawFile);
        }
    }

    function setAuthHeaders(xhr) {
        var readyStateListener = function() {
            if (xhr.readyState !== 1 /* OPENED */ ) {
                return;
            }

            var userSession = snap.userSession;

            xhr.setRequestHeader("Authorization", "Bearer " + userSession.token);
            xhr.setRequestHeader("X-Developer-Id", userSession.apiDeveloperId);
            xhr.setRequestHeader("X-Api-Key", userSession.apiKey);
            xhr.setRequestHeader("Accept", "text/plain");

            xhr.removeEventListener("readystatechange", readyStateListener);
        }
        xhr.addEventListener("readystatechange", readyStateListener);
    }

    function hideUploadButton($input) {
        $input.closest(".k-upload-button").hide();
    }

    function resetUploader($input, keepStatus) {
        var $kupload = $input.closest(".k-upload");

        $kupload.find(".k-upload-files").remove();

        if (!keepStatus) {
            $kupload.find(".k-upload-status").remove();
        }

        $kupload.addClass("k-upload-empty");

        $kupload
            .find(".k-upload-button")
            .removeClass("k-state-focused")
            .show();
    }
})();
/// <reference path="jquery-2.1.3.js" />
var snap = snap || {};

snap.getScript = snap.getScript || $.getScript;

;
(function(ua) {
    //Edge Support
    var browserRxs = {
        edge: /(edge)[ \/]([\w.]+)/i
    };
    for (var agent in browserRxs) {
        if (browserRxs.hasOwnProperty(agent)) {
            var match = ua.match(browserRxs[agent]);
            if (match) {
                var browser = {};
                browser[agent] = true;
                browser[match[1].toLowerCase().split(" ")[0].split("/")[0]] = true;
                browser.version = parseInt(document.documentMode || match[2], 10);
                kendo.support.browser = browser;
            }
        }
    }
}(navigator.userAgent));

snap.createCache = snap.createCache || function(requestFunction) {
    var cache = {};
    return function(key, callback) {
        if (!cache[key]) {
            cache[key] = $.Deferred(function(defer) {
                requestFunction(defer, key);
            }).promise();
        }
        return cache[key].done(callback);
    };
};
snap.cachedGetScript = snap.createCache(function(defer, url) {
    snap.getScript(url).then(defer.resolve, defer.reject);
});
snap.cachedGetHtml = snap.cachedGetHtml || snap.createCache(function(defer, url) {
    if (url.indexOf("v=1694") < 0) {
        if (url.indexOf("?") >= 0) {
            url = url + "&v=1694";
        } else {
            url = url + "?v=1694";
        }
    }
    $.get(url).then(defer.resolve, defer.reject);
});
$.extend(snap, {
    isUnloading: false,
    defaultHeight: 'ft/in',
    defaultWeight: 'lbs',
    loadSyncScript: function(fileName) {
        try {
            $.ajaxSetup({ async: false });
            $.getScript(fileName); //We don't use the async callback, because we need the translation in the next method
            $.ajaxSetup({ async: true });

        } catch (e) {
            console.error('Error while loading : ' + fileName);
        }
    },
    getBaseUrl: function() {
        var _url = location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/";

        return _url;
    },
    getHubUrl: function() {
        return snap.getBaseUrl() + "api/signalr/hubs";

    },
    loadGlobule: function() {
        if (isEmpty(snap.hospitalSession) || isEmpty(snap.hospitalSession.locale))
            snap.loadSyncScript('/Scripts/localization/labels-en-US.js');
        else
            snap.loadSyncScript('/Scripts/localization/labels-' + snap.hospitalSession.locale + '.js');
    },
    localize: function() {
        $(".local").each(function(e) {
            $(this).html(snap.labels[$(this).data("label")]);
        });
    },
    getUrlParam: function(name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        } else {
            return results[1] || 0;
        }
    },
    clearUserTimeZone: function() {
        $.ajax({
            type: "DELETE",
            url: "/api/v2/caches?cacheType=userTimeZone",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    },

    openHelp: function(helpType) {
        var path = '/api/v2/helpcenter/customer/url';
        if (helpType == 'admin')
            path = '/api/v2/helpcenter/admin/url';
        else if (helpType == 'clinician')
            path = '/api/v2/helpcenter/physician/url';

        $.ajax({
            type: "GET",
            url: path,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(response) {
                if (response.data && response.data.length) {
                    var win = window.open(response.data[0], '_blank');
                    if (win) {
                        win.focus();
                    } else {
                        snapInfo('Please allow popups for this site');
                    }

                }
            }
        });
    },

    htmlDecode: function(value) {
        if (value != null)
            return $('<div/>').html(value).text();

        return value;
    },

    patientLogin: function() {
        if (isEmpty(snap.hospitalSession))
            return "/Customer/Login";
        if (isEmpty(snap.hospitalSession.snapLogin) && snap.userSession && snap.userSession.snapLogin)
            return "/Customer/Login";
        if (!isEmpty(snap.hospitalSession.patientLogin)) {
            return snap.hospitalSession.patientLogin;
        } else {
            return "/Customer/Login";
        }

    },
    adminLogin: function() {
        return "/Admin/Login";
    },

    getPatientHome: function() {
      //  return "/Customer/Main/#/home";
      return "#/tab/userhome";
    },
    patientConsultEndUrl: function() {
        if (isEmpty(snap.hospitalSession))
            return snap.getPatientHome();
        if (isEmpty(snap.hospitalSession.snapLogin) && snap.userSession.snapLogin)
            return snap.getPatientHome();
        if (!isEmpty(snap.hospitalSession.patientConsultEndUrl)) {
            return snap.hospitalSession.patientConsultEndUrl;
        } else {
            return snap.getPatientHome();
        }

    },
    getClinicianHome: function() {
        return "/Physician/Main/#/patientQueue";
    },
    clinicianLogin: function() {
        if (isEmpty(snap.hospitalSession))
            return "/Physician/Login";
        if (isEmpty(snap.hospitalSession.snapLogin) && snap.userSession && snap.userSession.snapLogin)
            return "/Physician/Login";
        if (!isEmpty(snap.hospitalSession.clinicianLogin)) {
            return snap.hospitalSession.clinicianLogin;
        } else {
            return "/Physician/Login";
        }

    },
    clinicianConsultEndUrl: function() {
        if (isEmpty(snap.hospitalSession))
            return snap.getClinicianHome();
        if (isEmpty(snap.hospitalSession.snapLogin) && snap.userSession.snapLogin)
            return snap.getClinicianHome();
        if (!isEmpty(snap.hospitalSession.clinicianConsultEndUrl) && (snap.hospitalSession.clinicianConsultEndUrl !== "/Physician/WaitingList")) {
            return snap.hospitalSession.clinicianConsultEndUrl;
        } else {
            return snap.getClinicianHome();
        }

    },
    userAborted: function(xhr) {
        return !xhr.getAllResponseHeaders() || xhr.status == 401;
    },

    applyFieldValidation: function(hospitalSetting, field) {

        if (hospitalSetting) {
            field.addClass('required');
        }

    },
    getGenderString: function(gender) {
        switch (gender) {
            case "F":
                return "Female";
            case "M":
                return "Male";
            default:
                return "N/A";
        }
    },
    getAgeString: function(dbo) {
        if (dbo == null || dbo == "")
            return "";
        if (dbo == "N/A")
            return "N/A";
        if (dbo == ": N/A")
            return ": N/A";
        var hasColon = false;

        if ((typeof dbo === "string") && (dbo.indexOf(":") === 0)) {
            hasColon = true;
            dbo = dbo.replace(":", "").trim();
        }

        var ret = "";
        var now = new Date();
        var yearNow = now.getYear();
        var monthNow = now.getMonth();
        var dateNow = now.getDate();

        var compareDob = new Date(dbo);
        var yearDob = compareDob.getYear();
        var monthDob = compareDob.getMonth();
        var dateDob = compareDob.getDate();

        var year = yearNow - yearDob;
        var day;
        var month;
        if (monthNow >= monthDob)
            month = monthNow - monthDob;
        else {
            year--;
            month = 12 + monthNow - monthDob;
        }
        if (dateNow >= dateDob)
            day = dateNow - dateDob;
        else {
            month--;
            day = 31 + dateNow - dateDob;

            if (month < 0) {
                month = 11;
                year--;
            }
        }

        if (year > 0) {
            ret = year + " " + (year > 1 ? "Years" : "Year");
        } else if (month > 6) {
            ret = month + " " + (month > 1 ? "Months" : "Month");
        } else if (month > 0) {
            ret = month + " " + (month > 1 ? "Months" : "Month");
            ret += " " + day + " " + (day > 1 ? "Days" : "Day");
        } else {
            ret += " 0 Month " + day + " " + (day > 1 ? "Days" : "Day");
        }
        return hasColon ? (": " + ret) : ret;
    },
    getAgeCount: function(dob) {
        if (dob == null || dob == "")
            return "";
        var parsedDob = new Date(Date.parse(dob));
        var dobYear = parsedDob.getFullYear();
        var dobMonth = parsedDob.getMonth();
        var dobDate = parsedDob.getDate();
        var d = new Date();
        d.setHours(0, 0, 0, 0);
        var currentYear = d.getFullYear();
        var currentMonth = d.getMonth();
        var currentDate = d.getDate();

        var ageCount = currentYear - dobYear;
        var dayCount;
        var monthCount;
        if (currentMonth >= dobMonth)
            monthCount = currentMonth - dobMonth;
        else {
            ageCount--;
            monthCount = 12 + currentMonth - dobMonth;
        }
        if (currentDate >= dobDate)
            dayCount = currentDate - dobDate;
        else {
            monthCount--;
            dayCount = 31 + currentDate - dobDate;

            if (monthCount < 0) {
                monthCount = 11;
                ageCount--;
            }
        }
        return {
            year: ageCount,
            month: monthCount,
            day: dayCount
        };
    },
    addVersion: '?v=1694',
    setHospitalSettings: function() {
        snap.getSnapUserSession();
        if (isEmpty(snap.hospitalId)) {
            snap.hospitalId = snap.hospitalSession.hospitalId;
        }
        var $def = $.Deferred();
        var path = "/api/v2/Hospital/" + snap.hospitalId;

        $.ajax({
            url: path,
            type: 'GET',
            dataType: 'json',
            async: false,
            contentType: "application/json; charset==utf-8",

            success: function(response) {
                if (response) {
                    var data = response.data[0].enabledModules;
                    var hsettings = {};

                    hsettings.eCommerce = data.indexOf("ECommerce") > -1;
                    hsettings.onDemand = data.indexOf("OnDemand") > -1;
                    hsettings.cPTCodes = data.indexOf("CPTCodes") > -1;
                    hsettings.messaging = data.indexOf("Messaging") > -1;

                    hsettings.insuranceVerification = data.indexOf("InsuranceVerification") > -1;
                    hsettings.ePrescriptions = data.indexOf("EPrescriptions") > -1;
                    hsettings.ePrescriptions_EPSchedule = data.indexOf("EPrescriptions_EPSchedule") > -1;
                    hsettings.intakeForm = data.indexOf("IntakeForm") > -1;
                    hsettings.intakeForm_OnDemand = data.indexOf("IntakeForm_OnDemand") > -1;
                    hsettings.intakeForm_Scheduled = data.indexOf("IntakeForm_Scheduled") > -1;
                    hsettings.providerSearch = data.indexOf("ClinicianSearch") > -1;
                    hsettings.rxNTEHR = data.indexOf("RxNTEHR") > -1;
                    hsettings.rxNTPM = data.indexOf("RxNTPM") > -1;
                    hsettings.hidePaymentPageBeforeWaitingRoom = data.indexOf("HidePaymentPageBeforeWaitingRoom") > -1;
                    hsettings.fileSharing = data.indexOf("FileSharing") > -1;
                    hsettings.insuranceBeforeWaiting = data.indexOf("InsuranceBeforeWaiting") > -1;
                    hsettings.ePerscriptions = data.indexOf("EPerscriptions") > -1;
                    hsettings.ePSchedule1 = data.indexOf("EPSchedule1") > -1;

                    hsettings.iCD9Codes = data.indexOf("ICD9Codes") > -1;
                    hsettings.textMessaging = data.indexOf("TextMessaging") > -1;
                    hsettings.insVerificationDummy = data.indexOf("InsVerificationDummy") > -1;
                    hsettings.videoBeta = data.indexOf("VideoBeta") > -1;
                    hsettings.hidePaymentBeforeWaiting = data.indexOf("HidePaymentBeforeWaiting") > -1;
                    hsettings.showCTTOnScheduled = data.indexOf("ShowCTTOnScheduled") > -1;

                    hsettings.pPIsBloodTypeRequired = data.indexOf("PPIsBloodTypeRequired") > -1;
                    hsettings.pPIsHairColorRequired = data.indexOf("PPIsHairColorRequired") > -1;
                    hsettings.pPIsEthnicityRequired = data.indexOf("PPIsEthnicityRequired") > -1;
                    hsettings.pPIsEyeColorRequired = data.indexOf("PPIsEyeColorRequired") > -1;
                    hsettings.organizationLocation = data.indexOf("OrganizationLocation") > -1;

                    hsettings.AddressValidation = data.indexOf("AddressValidation") > -1;

                    hsettings.hideOpenConsultation = data.indexOf("HideOpenConsultation") > -1;
                    hsettings.hideDrToDrChat = data.indexOf("HideDrToDrChat") > -1;
                    hsettings.drToDrChatInAdmin = false; //data.indexOf("DrToDrChatInAdmin") > -1;
                    //alert(data.indexOf("HideDrToDrChat"));
                    //Addd Public facing Hospital Setting
                    if (response.data[0]['settings']) {
                        $.extend(hsettings, response.data[0]['settings']);
                    }


                    snap.setSnapJsSession("snap_hospital_settings", hsettings);

                    snap.hospitalSettings = hsettings;

                    $def.resolve();
                }
            },
            error: function(response) {
                $def.reject("Failed to Load Client Profile");
                snapError("Failed to Load Client Profile");
            }
        });

        return $def.promise();
    },
    getSnapHospitalSession: function() {
        //Use JSON to retrieve the stored data and convert it
        var storedData = sessionStorage.getItem("snap_hospital_session");
        if (storedData) {
            snap.hospitalSession = JSON.parse(storedData);
        }
    },
    getSnapHospitalSettings: function() {
        //Use JSON to retrieve the stored data and convert it
        var storedData = sessionStorage.getItem("snap_hospital_settings");
        if (storedData) {
            snap.hospitalSettings = JSON.parse(storedData);
        }

    },
    updateSnapJsSession: function(sessionName, sessionDataKey, sessionDataValue) {
        if(sessionName === "snap_user_session") {
          var sessionData = snap.userSession; //JSON.parse(sessionStorage.getItem(sessionName));
        } else if(sessionName === "snap_patientprofile_session") {
            var sessionData = snap.profileSession;
        } else if(sessionName === "snap_hospital_session") {
            var sessionData = snap.hospitalSession;
        } else if(sessionName === "snap_hospital_settings") {
            var sessionData = snap.hospitalSettings;
        }
        sessionData[sessionDataKey] = sessionDataValue;
        sessionStorage.setItem(sessionName, JSON.stringify(sessionData));
    },
    setSnapJsSession: function(sessionName, snapSessionData) {
        sessionStorage.setItem(sessionName, JSON.stringify(snapSessionData));
    },
    getSnapUserSession: function() {
        //Use JSON to retrieve the stored data and convert it
        var storedData = sessionStorage.getItem("snap_user_session");

        if (storedData) {
            snap.userSession = JSON.parse(storedData);
        } else {
            snap.userSession = {};
        }
    },
    updateSnapUserSessionValue: function(key, value) {
        if (!snap.userSession) {
            this.getSnapUserSession();
        }
        var csettings = snap.userSession;
        csettings[key] = value;
        snap.userSession = csettings;
        snap.setSnapJsSession("snap_user_session", csettings);
        this.getSnapUserSession();
    },
    updateSnapConsultationSessionValue: function(key, value) {
        if (!snap.consultationSession) {
            this.getSnapConsultationSession();
        }
        var csettings = snap.consultationSession;
        csettings[key] = value;
        snap.consultationSession = csettings;
        snap.setSnapJsSession("snap_consultation_session", csettings);
        this.getSnapConsultationSession();
    },

    updateSnapConsultationSessionMultipleValues: function(valuesObject) {
        if (!snap.consultationSession) {
            this.getSnapConsultationSession();
        }
        var csettings = snap.consultationSession;
        for (var key in valuesObject) {
            csettings[key] = valuesObject[key];
        }
        snap.consultationSession = csettings;
        snap.setSnapJsSession("snap_consultation_session", csettings);
        this.getSnapConsultationSession();
    },
    setSnapConsultationSessionData: function(consultationData) {
        snap.setSnapJsSession("snap_consultation_session", consultationData);
        snap.consultationSession = consultationData;
    },
    getSnapConsultationSession: function() {
        var storedData = sessionStorage.getItem("snap_consultation_session");
        if (storedData) {
            snap.consultationSession = JSON.parse(storedData);
        } else {
            snap.setSnapConsultationSessionData({ consultationId: 0, isScheduled: false, patientId: 0, currentStep: 0, totalSteps: 0 });
        }
    },
    sessionStorageExists: function(dataName) {
        if (sessionStorage.getItem(dataName) == null)
            return false;
        return true;
    },
    clearSnapConsultationSession: function() {
        snap.consultationSession = null;
        sessionStorage.removeItem("snap_consultation_session");
    },

    getSnapChatRecentSession: function() {
        var storedData = sessionStorage.getItem("snap_chatrecent_session");
        if (storedData) {
            snap.chatRecentSession = JSON.parse(storedData);
        } else {
            snap.chatRecentSession = [];
        }
    },
    setSnapChatRecentSession: function(data) {
        data = data || [];
        snap.setSnapJsSession("snap_chatrecent_session", data);
        snap.chatRecentSession = callData;
    },
    addToSnapChatRecentSession: function(userId) {
        snap.chatRecentSession = snap.chatRecentSession || [];
        var oldIndex = snap.chatRecentSession.indexOf(userId);
        if (oldIndex >= 0) {
            snap.chatRecentSession.splice(oldIndex, 1);
        }
        snap.chatRecentSession.push(userId);
        snap.setSnapJsSession("snap_chatrecent_session", snap.chatRecentSession);
    },

    clearAllSnapSessions: function() {
        var i = sessionStorage.length;
        while (i--) {
            var key = sessionStorage.key(i);
            if (/snap/.test(key)) {
                sessionStorage.removeItem(key);
            }
        }
    },
    getStaffProfileSession: function() {
        var storedData = sessionStorage.getItem("snap_staffprofile_session");
        if (storedData) {
            snap.profileSession = JSON.parse(storedData);
        }
    },
    getPatientProfileSession: function() {
        var storedData = sessionStorage.getItem("snap_patientprofile_session");
        if (storedData) {
            snap.profileSession = JSON.parse(storedData);
        }
    },
    isProviderChatEnabled: function() {
        return !snap.hospitalSettings.hideDrToDrChat && snap.hasAllPermission(snap.security.provider_chat);
    },

    isAdminPatientQueueEnabled: function() {
        return snap.hasAllPermission(snap.security.view_admin_patient_queue);
    },

    setNumericText: function(control, format, text, max) {
        control.data("kendoNumericTextBox").max(max);
        if (control.data("kendoNumericTextBox").value() > max)
            control.data("kendoNumericTextBox").value(max);
        else
            control.data("kendoNumericTextBox").value(control.data("kendoNumericTextBox").value());
    },
    cachedScript: function(url) {
        return $.ajax({
            dataType: "script",
            cache: true,
            url: url
        });
    },
    setPageTitle: function() {
        var pageName = window.location.href.split('/');
        console.info('pageName[pageName.length - 1]: ' + pageName[pageName.length - 1] + '  --  $.trim($(document).attr("title")).length: ' + $.trim($(this).attr("title")).length);
        if ($.trim($(document).attr("title")).length == 0) //already not assigned title
            $(document).attr("title", pageName[pageName.length - 1]);
    },

    setSecruityValues: function() {

        /* bit mask */
        var sec = {};

        sec.e_prescription_creation = 1;
        sec.e_prescription_authorization = 2;
        sec.e_prescription_submission = 3;
        sec.conduct_virtual_consultations = 4;
        sec.view_patient_demographics = 5;
        sec.view_patient_personal_health_information = 6;
        sec.schedule_consultations = 7;
        sec.view_past_consultations = 8;
        sec.edit_past_consultations = 9;
        sec.provider_chat = 10;
        sec.view_staff_accounts = 11;
        sec.edit_staff_accounts = 12;
        sec.edit_public_facing_profile_details_self = 13;
        sec.edit_public_facing_profile_details_others = 14;
        sec.create_staff_accounts = 15;
        sec.create_new_admin_user = 16;
        sec.create_reports = 17;
        sec.view_reports = 18;
        sec.assign_roles = 19;
        sec.create_roles = 20;
        sec.delete_roles = 21;
        sec.disable_roles = 22;
        sec.view_edit_admin_preferences = 23;

        sec.can_access_my_files = 28;
        sec.can_view_patient_files = 29;
        sec.can_copy_upload_to_patient_files = 30;
        sec.can_manage_hospital_files = 31;

        sec.view_tags = 32;
        sec.create_tags = 33;
        sec.delete_tags = 34;
        sec.assign_tags = 35;
        sec.view_roles = 36;
        sec.view_patients_accounts = 37;
        sec.edit_patients_accounts = 38;

        sec.view_admin_dashboard = 39;

        sec.can_manage_staff_files = 40;

        sec.create_groups = 41;
        sec.remove_groups = 42;
        sec.modify_groups = 43;
        sec.manage_staff_schedule = 44;
        sec.view_workflows = 45;
        sec.edit_workflows = 46;

        sec.open_consultation = 48;
        sec.view_admin_patient_queue = 49;
        snap.security = sec;
    },
    hasAllPermission: function() {
        var roules = arguments[0];
        if (!Array.isArray(roules))
            roules = arguments;
        for (var i = 0; i < roules.length; i++) {
            var r = roules[i];
            if (r < 32) {
                if ((this.userSession.security1to31 & 1 << (r - 1)) === 0)
                    return false;
            } else {
                if ((this.userSession.security32to63 & 1 << (r - 32)) === 0)
                    return false;

            }
        }
        return true;
    },
    hasAnyPermission: function() {
        var roules = arguments[0];
        if (!Array.isArray(roules))
            roules = arguments;
        for (var i = 0; i < roules.length; i++) {
            var r = roules[i];
            if (r < 32) {
                if ((this.userSession.security1to31 & 1 << (r - 1)) > 0)
                    return true;
            } else {
                if ((this.userSession.security32to63 & 1 << (r - 32)) > 0)
                    return true;

            }
        }
        return false;
    },
    canLoginClinician: function() {
        if (snap.hasAllPermission(snap.security.conduct_virtual_consultations))
            return true;
        return false;
    },
    canLoginAdmin: function() {
        if (((snap.userSession.security32to63 & 2147483647) > 0) || ((snap.userSession.security1to31 & 134216704) > 0))
            return true;
        return false;
    },
    canScheduleConsultation: function() {
        return snap.hasAllPermission(snap.security.schedule_consultations);
    },
    canRecordConsultation: function() {
        return snap.hasAllPermission(snap.security.conduct_virtual_consultations);
    },
    openMobileApp: function(consulationId, cb, isLogin) {
        cb = cb || function() {};
        if (kendo.support.mobileOS['ios'] || isLogin) {
            setTimeout(function() {
                snap.openMobileAppInternal(consulationId);
            }, 200);
            return;
        }

      /*  if (kendo.support.mobileOS['android']) {
            snapConfirm("Use the VirtualCare App for the best consultation experience.");
            $("#btnConfirmYes").html("Go");
            $("#btnConfirmNo").html("Not Now");
            $("#btnConfirmYes").click(function() {
                $(".k-notification-confirmation").parent().remove();
                setTimeout(function() {
                    snap.openMobileAppInternal(consulationId);
                }, 200);
            });

            $("#btnConfirmNo").click(function() {
                $(".k-notification-confirmation").parent().remove();
                cb();
            });
        }*/

    },
    getMobileAppSchema: function() {
        if (!snap['hospitalSettings']) {
            snap.getSnapHospitalSettings();
        }
        var schemaKey;
        if (kendo.support.mobileOS['android']) {
            schemaKey = "androidSchemaUrl";
        } else {
            schemaKey = "iOSSchemaUrl";
        }
        var schamaName = snap.hospitalSettings[schemaKey];
        if (schamaName) {
            return schamaName;
        }
        return "snapmdconnectedcare";
    },
    getMobileAppStoreUrl: function() {
        if (!snap['hospitalSettings']) {
            snap.getSnapHospitalSettings();
        }
        var schemaKey;
        if (kendo.support.mobileOS['android']) {
            schemaKey = "androidPlayStoreUrl";
        } else {
            schemaKey = "iOSAppStoreUrl";
        }
        var appStoreUrl = snap.hospitalSettings[schemaKey];
        if (appStoreUrl) {
            return appStoreUrl;
        }
        return schemaKey == "iOSAppStoreUrl" ? snap.iosAppLink : snap.andriodAppLink;
    },
    formatPhoneNumber: function(phoneNumber) {
        phoneNumber = $.trim(phoneNumber);
        var pattern;
        var result;
        var isPlus = false;
        var subSet;

        if (phoneNumber.indexOf("+") > -1) {
            isPlus = true;
        }

        result = getNumbersFromString(phoneNumber);

        if (result.length > 9) {

            if (result.length === 10) {
                pattern = /\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})/g;
                subSet = '($1) $2-$3';
            } else if (result.length === 11) {
                pattern = /\(?(\d{1})\)?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})/g;
                subSet = '$1($2) $3-$4';
            } else {
                pattern = /\(?(\d{2})\)?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})/g;

                subSet = '$1($2) $3-$4';
            }

            result = result.replace(pattern, subSet);

            if (isPlus)
                result = "+" + result;

            return result;
        } else
            return phoneNumber;
    },
    openMobileAppInternal: function(consultationId) {

        consultationId = consultationId || "";
        var env = "production";
        var host = location.host;
        if (host.indexOf("-qa.com") >= 0) {
            env = "qa";
        } else if (host.indexOf("-stage.com") >= 0) {
            env = "stage";
        } else if (host.indexOf("sandbox") >= 0) {
            env = "sandbox";
        }

        snap.getSnapUserSession();
        snap.getSnapHospitalSession();
        var token = "";
        var hospitalId;
        if (snap.userSession) {
            token = snap.userSession.token;
        }
        if (snap.hospitalSession) {
            hospitalId = snap.hospitalSession.hospitalId;
        } else {
            hospitalId = snap.hospitalId;
        }
        var schemaUlr = snap.getMobileAppSchema();
        var url = schemaUlr + "://?token=" + token + "&hospitalId=" + hospitalId + "&env=" + env + "&consultationId=" + consultationId;
        if (kendo.support.mobileOS['ios']) {
            if (kendo.support.mobileOS['majorVersion'] >= 9) {
                window.location = url;
            } else {

                $('<iframe />').attr("id", "hiddenIFrame").attr('href', url).attr('style', 'display:none;').appendTo('body');
                setTimeout(function() {
                    setTimeout(function() {
                        $("#hiddenIFrame").remove();
                    }, 100);
                }, 200);
            }
        } else {

            window.location = url;

        }
        var intervalTime = null;
        setTimeout(function() {
            intervalTime = setInterval(function() {
                $(".k-notification-confirmation").parent().remove();
            }, 7000);
            var promptUser = function() {
                snapConfirm("You will need our mobile app to conduct a consultation on the platform.");
                $("#btnConfirmYes").html("Get the app");
                $("#btnConfirmNo").html("Ignore");
                $("#btnConfirmYes").click(function() {
                    $(".k-notification-confirmation").parent().remove();
                    clearInterval(intervalTime);
                    if ((kendo.support.mobileOS['android']) || (kendo.support.mobileOS['ios'])) {
                        window.location.href = snap.getMobileAppStoreUrl();
                    } else {
                        snapInfo("Comming Soon.");
                    }
                });
                $("#btnConfirmNo").click(function() {
                    clearInterval(intervalTime);
                    $(".k-notification-confirmation").parent().remove();
                    snapConfirm("This action will cancel your consultation request. Are you sure you want to cancel?");
                    $("#btnConfirmYes").click(function() {
                        $(".k-notification-confirmation").parent().remove();
                    });
                    $("#btnConfirmNo").click(function() {
                        $(".k-notification-confirmation").parent().remove();
                        promptUser();
                    });

                });
            };
            promptUser();
            //wait for 7 sec if app not oppened then open mobile app linek.
        }, 7000);

    },
    redirectToMobileApp: false,
    iosAppLink: 'https://itunes.apple.com/us/app/virtual-care/id1035220141?ls=1&mt=8',
    andriodAppLink: 'https://play.google.com/store/apps/details?id=com.snap.connectedcare.production',
    consultationStatus: {
        unknown: 0,
        paymentDone: 68,
        doctorAssigned: 69,
        doctorInitiatedConsultation: 70,
        startedConsultation: 71,
        endedConsultation: 72,
        cancelConsultaion: 79,
        inProgress: 80,
        droppedConsultation: 81,
        customerInWaiting: 82,
        doctorReviewConsultation: 154,
        dismissed: 163,
        patientEndConsultation: 73,
        disconnectedConsultation: 83
    },
    isUserLoggedIn: function() {
        return sessionStorage.getItem("snap_user_session") ? true : false;
    }
});
snap.setSecruityValues();
$(function() {
    snap.loadGlobule();
    snap.localize();
    snap.setPageTitle();
});

function validateEmail(email) {
    return _testInput(email, snap.regExMail);
}

function validatePassword(pwd) {
    return _testInput(pwd, /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])[^\s\n\r]{8,20})$/);
}

function _testInput(text, regExp) {
    try {
        return regExp.test(text);
    } catch (err) {};
    return false;
}

function snapValidateHealthPlanDOBByDate(date) {
    var errMsg = snap.dateValidation.validateDOB(date);
    var testdate = new Date(date);

    if ((errMsg == "") && (testdate > snap.dateLimits.getHealthPlanMaxDate())) {
        errMsg = "Subscriber should be at least 13 years old";
    }
    return errMsg;
}

function PreventIvalidSymbolsInPasswordOrEmail($input) {
    $input.on({
        keydown: function(e) {
            return e.which !== 32; // 32 is the ASCII value for a space
        },
        change: function() {
            this.value = this.value.replace(/\s/g, "");
        }
    });
}

var validationMessages = {
    passwordInvaild: "Your Password must be between 8 and 20 characters,<br >contain at least one upper and lower case letter and at least one number,<br>and must not contain any spaces.<br/>",
    emailInvalid: "Please enter a valid email address <br/>",
    zipInvalid: "Zip/Postal Code must be between 3 and 10 characters"
};

var isValidFolderName = function(str) {
    var regex = /^[^\\/?%*:|"<>]+$/;
    return regex.test(str);
};

function isValidName(str) {
    if ((str != null) && (str.length > 0 && str.length < 50)) {
        return true;
    }
    return false;
}

function IsContactNumberValid() {
    var textBoxContactNumber = $.trim($("#phone-field").val());
    if (textBoxContactNumber.length < 5 || textBoxContactNumber.length > 20) {
        snapError("Contact Number must be minimum 5 & maximum 20 digits.");
        return false;
    }
    return true;
}

function ValidatePhone(phoneNumber, fieldForError, isRequired) {
    try {
        if (phoneNumber != "") {
            if (phoneNumber.length < 5 || phoneNumber.length > 15) {
                return fieldForError + " length must be greater than 4 and less than 16";
            }
        } else {
            if (isRequired) {
                return "Please enter a " + fieldForError;
            }
        }
        return "";
    } catch (err) {
        logError("ValidatePhone()", "Error", err, "While validating the phone format this error may occured.");
    }
}

(function($, $snap) {

    snap.namespace("snap.enums")
        .define("ErrorTypeEnum", function() {
            this.Default = 0;
            this.TokenExpired_Admin = 1;
            this.EmailAlreadyInUse_Admin = 2;
            this.TokenExpired_Customer = 3;
            this.EmailAlreadyInUse_Customer = 4;
            this.TokenInvalid_Invitation = 5;

        }).singleton();

    snap.namespace("snap.enums")
        .define("SnapEvents", function() {
            this.GetClientInfo = "GetClientInfo";
        }).singleton();

    snap.namespace("snap.enums")
        .define("PhoneTypes", function() {
            this.home = 0;
            this.mobile = 1;
            this.other = 3;
        }).singleton();

    $snap.enums.EncounterTypeCode = $snap.enums.EncounterTypeCode || {
        None: 0,
        Text: 1,
        Phone: 2,
        Video: 3,
        InPerson: 4
    };

})(jQuery, snap);

(function($, $snap) {
    var snap = {
        utilities: {
            browsers: {
                chrome: "53",
                firefox: "49"
            }
        }
    };

    $.extend($snap, snap);

})(jQuery, snap);
(function($, $snap) {

    snap.namespace("snap")
        .define("userIq", function() {
            var that = this;

            that.configure = function(user_id, account_id, user_type) {

                //define global variabble
                window._uiq = window._uiq || [];
                var _uiq = window._uiq;

                _uiq.push(['setCustomVariable', '1', 'user_id', user_id, 'visit']);
                _uiq.push(['setCustomVariable', '2', 'account_id', account_id, 'visit']);
                _uiq.push(['setCustomVariable', '3', 'user_type', user_type, 'visit']);

                _uiq.push(["enableLinkTracking"]);
                _uiq.push(["trackPageView"]);
                (function() {
                    var _uiq_config_url = (("https:" == document.location.protocol) ? "https" : "http") + "://feed.useriq.com/";
                    var _uiq_prod_url = (("https:" == document.location.protocol) ? "https" : "http") + "://secure.useriq.com/";
                    _uiq.push(["setTrackerUrl", _uiq_prod_url + "visits/push"]);
                    _uiq.push(["setSiteId", "406028401"]);
                    var d = document,
                        g = d.createElement("script"),
                        s = d.getElementsByTagName("script")[0];
                    g.type = "text/javascript";
                    g.defer = true;
                    g.async = true;
                    g.src = _uiq_config_url + "useriq.js";
                    s.parentNode.insertBefore(g, s);
                })();
            }

        }).singleton();

})(jQuery, snap);



/// <reference path="../jquery-2.1.3.js" />
/// <reference path="../kendo.all.min.js" />

/// <reference path="../../core/snap.core.js" />
/// <reference path="../../core/snapNotification.js" />
/// <reference path="../../core/snapHttp.js" />
/// <reference path="../../core/loadingcoremodule.js" />

;
(function($) {


    snap.namespace("snap.utility").define("PageStyle", function() {
        this.applyStyle = function() {
            var $def = $.Deferred();
            var path = snap.string.formatURIComponents("/less/styles.less.dynamic?brandColor={0}&v=1694", snap.hospitalSession.brandColor);
            try {
                var dynamicCss = jQuery("<link>").prop({
                    type: 'text/css',
                    rel: 'stylesheet',
                    href: path,
                    media: 'screen',
                    title: 'dynamicLoadedSheet'
                }).on("load", function() {

                    $def.resolve(true);
                });
                document.head.appendChild(dynamicCss[0]);
            } catch (err) {
                $("head").append($("<link rel='stylesheet' href='" + path + "' type='text/css' media='screen' />"));

                $def.resolve(true);
            }
            return $def.promise();
        };
        this.applyAdminStyle = function() {
            var path = snap.string.formatURIComponents("/less/admin.less.dynamic?brandColor={0}&v=1694", snap.hospitalSession.brandColor);
            try {
                var dynamicCss = jQuery("<link>").prop({
                    type: 'text/css',
                    rel: 'stylesheet',
                    href: path,
                    media: 'screen',
                    title: 'dynamicLoadedSheet'
                }).on("load", function() {


                });
                document.head.appendChild(dynamicCss[0]);
            } catch (err) {
                $("head").append($("<link rel='stylesheet' href='" + path + "' type='text/css' media='screen' />"));


            }

        };
        this.applyStyleV3 = function() {
            var $def = $.Deferred();
            var baseUrl = snap.baseUrl;
            var path = snap.string.formatURIComponents("/less/v3/styles.v3.less.dynamic?brandColor={0}&v=1694", snap.hospitalSession.brandColor);
            var baseUrl = snap.baseUrl;
            try {
                var dynamicCss = jQuery("<link>").prop({
                    type: 'text/css',
                    rel: 'stylesheet',
                    async: false,
                    href: baseUrl + path,
                    media: 'screen',
                    title: 'dynamicLoadedSheet'
                }).on("load", function() {
                    $def.resolve(true);
                });

                document.head.appendChild(dynamicCss[0]);
            } catch (err) {
                $("head").append($("<link rel='stylesheet' href='" + path + "' type='text/css' media='screen' />"));
                $def.resolve(true);

            }
            return $def.promise();
        };

    }).singleton();



}(jQuery));
