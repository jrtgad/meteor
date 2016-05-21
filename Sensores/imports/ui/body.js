import { Template } from 'meteor/templating';
import './body.html';
//import sensores from '../../server/main.js';

//var server = require("../../server/main.js");

//console.log(server);

var now = new Date(),
    h = now.getHours(),
    m = now.getMinutes(),
    s = now.getSeconds(),
    d = now.getDate(),
    mo = now.getUTCMonth(),
    y = now.getUTCFullYear();

now = d + "/" + mo + "/" + y + "  -  " + h + ":" + m + ":" + s;

Template.body.helpers({
    tasks: [
        { temperature: 32.6, pressure: 930.2, humidity: 32.4, time: now },
        { temperature: 32.6, pressure: 930.2, humidity: 32.4, time: now },
        { temperature: 32.6, pressure: 930.2, humidity: 32.4, time: now },
        { temperature: 32.6, pressure: 930.2, humidity: 32.4, time: now },
        { temperature: 26.6, pressure: 920.2, humidity: 30.4, time: now },
        { temperature: 2.6, pressure: 92.2, humidity: 3.4, time: now },
    ],
});
