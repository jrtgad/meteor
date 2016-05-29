"use strict";

$(document).ready(function () {
    $("temperature").change(function (x) {
        x.text.substr(0, indexOf("º")) > 30 ? x.className = "rojo" : x.className = "verde";
    });
});
