const net = require('net');
const { connectdb } = require('./db.connect');
const { SaveData } = require('./controler');


const mytcp = net.createServer(async(socket)=>{
      console.log('One connectio done');
      socket.on('data',async (hexdata)=>{
        const myVluse  = Object.values(hexdata);
        const data = {
            IdNumber:myVluse[0].toString(16),
            minSpeed:myVluse[1].toString(16),
            MaxSpeed:myVluse[2].toString(16),
            Price:myVluse[3].toString()
        }
      const res =  await SaveData(data);
    socket.write(res);

      })
});

const port = 3001;

mytcp.listen(port,'localhost', async()=>{
    await connectdb();
    console.log('server started');
})