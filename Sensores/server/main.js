import { Meteor } from 'meteor/meteor';

var mqtt = require('mqtt');

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

    var msg = function () {

    };

    client.on("message", function (topic, message) {
        ServerSession.set("msg", message.toString());
        /*module.exports = {
            data: message.toString()
        };*/

        console.log(message.toString());
    });
});
