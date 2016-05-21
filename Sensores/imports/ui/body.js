import { Template } from 'meteor/templating';
import './body.html';

var now = new Date(),
    h = now.getHours(),
    m = now.getMinutes(),
    s = now.getSeconds(),
    d = now.getDate(),
    mo = now.getUTCMonth(),
    y = now.getUTCFullYear();

now = d + "/" + mo + "/" + y + "  -  " + h + ":" + m + ":" + s;

var server = require("../../server/main.js");


Template.body.helpers({
    tasks: [
        server.data.toJSON(),
    ],
});
