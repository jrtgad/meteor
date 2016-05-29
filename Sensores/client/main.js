import '../imports/ui/body.js';

$(document).ready(function () {
    //alert("misco");
    $("#temp").change(function () {
        parseInt(x.innerHTML) > 30 ? this.className = "rojo" : this.className = "verde";
    }, false);
});
