function obtenerQueryString (key, defaultValue) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = null;

    if (estoyEnIframe()) {
    	match = document.referrer.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    } else {
    	match =location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    }

    if (match) {
        return decodeURIComponent(match[1].replace(/\+/g, " "));
    }

    if (typeof defaultValue == "undefined") {
        defaultValue = false;
    }

    return defaultValue;
}

function estoyEnIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}