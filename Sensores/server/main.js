import { Meteor } from 'meteor/meteor';
import '../imports/api/data.js';
import { Mongo } from 'meteor/mongo';
import { Data } from '../imports/api/data.js';

var mqtt = require('mqtt');
var Fiber = Npm.require('fibers');

String.prototype.replaceAll = function (target, replacement) {
    return this.split(target).join(replacement);
};

function insertMessage(message) {
    var now = new Date(),
        h = now.getHours().toString(),
        m = now.getMinutes().toString(),
        s = now.getSeconds().toString(),
        d = now.getDate().toString(),
        mo = now.getUTCMonth().toString(),
        y = now.getUTCFullYear().toString();
    h = h.length < 2 ? "0" + h : h;
    m = m.length < 2 ? "0" + m : m;
    s = s.length < 2 ? "0" + s : s;
    d = d.length < 2 ? "0" + d : d;
    mo = mo.length < 2 ? "0" + mo : mo;

    now = d + "/" + mo + "/" + y + "  -  " + h + ":" + m + ":" + s;

    Fiber(function () {
        Data.insert({ temperature: message.temperature, pressure: message.pressure, humidity: message.humidity, time: now });
    }).run();
}

Meteor.startup(() => {

    //shared collection
    //Sensores = new Meteor.Collection("Sensores");
    const client = mqtt.connect('mqtt://m21.cloudmqtt.com', {
        port: 13438,
        clientId: "clientId-3IJf14u1aSasd",
        username: "lkvezrhe",
        password: "Qx5YthbMM3RP",
        clean: false,
        insert: true,
        sync: true,
        readable: true
    });

    client.on('error', function (err) {
        console.log(err);
    });

    client.on('connect', function () {
        client.subscribe("Sensores");
    });

    client.on("message", function (topic, message) {
        //console.log(JSON.parse(message.toString().replaceAll("'", "\"")));
        insertMessage(JSON.parse(message.toString().replaceAll("'", "\"")));
    });

});
