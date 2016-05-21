import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
    //shared collection
    exports.Sensores = new Meteor.Collection("Sensores");

    //    var client = mqtt.Client(streamBuilder, options);

    var mqtt = require('mqtt');
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

    //client.on("message", function (message) {
    //  console.log(message);
    //});
    client.on('error', function (err) {
        console.log(err);
    });
    client.on('connect', function () {
        client.subscribe("Sensores");
    });

    client.on("message", function (topic, message) {
        console.log(topic + ":" + message.toString());
        Sensores.insert(message.toJSON());
        //console.log(Sensores);
    });
});
