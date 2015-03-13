function obtenerQueryString (key, defaultValue) {
    key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
    var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
    if (match) {
        return decodeURIComponent(match[1].replace(/\+/g, " "));
    }

    if (typeof defaultValue == "undefined") {
        defaultValue = false;
    }

    return defaultValue;
}