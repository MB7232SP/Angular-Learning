import mqtt from 'mqtt';

const client = mqtt.connect('mqtt://test.mosquitto.org');
const clientId = 'fhvegfyrefyugfyufev';
client.on('connect',()=>{
   setInterval(()=>{
    const number = Math.floor(Math.random()*100);
    console.log(number,'flow Number');
    const massage = {
        priority:"high",
        OverFlowNum: number,
        clientId,
    }
    if(number>80){
        client.publish('OverFlowData', JSON.stringify(massage));
    }
   },4000);
})
