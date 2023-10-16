import mqtt from 'mqtt';
import mongoose from 'mongoose'

import { DbConnet } from './db/db.js';
import { AddData } from './Model And Controler/flow.ontroler.js';

const server = mqtt.connect('mqtt://test.mosquitto.org');

server.on('connect', ()=>{
    server.subscribe('OverFlowData',async ()=>{
        await DbConnet(mongoose);
      console.log('subscribed successfully');

    })
})

server.on('message',async(topic,msg)=>{
    const clientmsg = JSON.parse(msg);
    console.log(clientmsg);
    await AddData(clientmsg);
})
