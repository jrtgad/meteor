import { Meteor } from 'meteor/meteor';
import '../imports/api/data.js';
import { Mongo } from 'meteor/mongo';
import { Data } from '../imports/api/data.js';

var mqtt = require('mqtt');
var Fiber = Npm.require('fibers');

function insertMessage(message) {
    var now = new Date(),
        h = now.getHours(),
        m = now.getMinutes(),
        s = now.getSeconds(),
        d = now.getDate(),
        mo = now.getUTCMonth(),
        y = now.getUTCFullYear();

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
        //console.log(JSON.parse(message));
        insertMessage(JSON.parse(message));
    });

});
