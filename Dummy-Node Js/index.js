const express = require('express');
const { connect } = require('./db');
const { dbcontrol } = require('./constroler');
const app = express();
app.use(express.json());
app.get('/',async(req,res)=>{
     res.send({status:'success',res:'Hello dummy project'});
})
app.get('/agreegate/:id',async (req, res) => {
   let data =  await dbcontrol.agreegationbasedOnId(req.params.id);
     res.send(data);
});
app.get('/groupby_delete',async (req, res) => {
  let data =  await dbcontrol.GroupByDeleteStatus();
    res.send(data);
});
app.get('/three_collection',async (req, res) => {
  let data =  await dbcontrol.agreegateThreecollection();
    res.send(data);
});
app.get('/getdata/:vin',async(req,res)=>{
    let data = await dbcontrol.GetDeviceDataByVin(req.params.vin);
    res.send(data);
})
app.get('/search',async(req,res)=>{
    const {serchdata,page, size } = req.query

    let data = await dbcontrol.SerchDevice(serchdata,page,size);
    res.send(data);
})
const port = 3000;
const hostname = 'localhost';
app.listen(port, async () => {
    await connect();
  console.log(`Server running on http://${hostname}:${port}/`);
});

