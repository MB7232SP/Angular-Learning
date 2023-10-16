const express = require('express');
const { connect } = require('./db');
const { dbcontrol } = require('./controler');
const { default: mongoose } = require('mongoose');
const multer = require('multer');
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const app = express();
app.use(express.json());
app.use(cors())
const storage = multer.diskStorage({
    destination: 'Images/',
    filename: (req, file, cb) => {
      const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
});
const upload = multer({ storage });
app.use('/Images', express.static('Images'));

app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
      // Construct the image URL
      const imageUrl = `http://localhost:3000/Images/${req.file.filename}`;
      res.json({ imageUrl });
    } else {
      res.status(400).json({ error: 'Image upload failed' });
    }
});
app.get('/alldata',async(req,res)=>{
    try {
        let result = await dbcontrol.getData();
        res.send(result);
    } catch (error) {
    res.send({
        status:'error',
        data:[],
        error
    }) 
    }
})
app.delete('/delete/:id',async(req,res)=>{
    try {
      const result = await dbcontrol.deleteData(req.params.id);
      res.send(result);
    } catch (error) {
        res.send({
            status:'error',
           mas:'somthing went wrong',
            error
        }) 
    }
})
app.patch('/update',async(req,res)=>{
    try {
        let payload = req.body;
        payload._id= new mongoose.Types.ObjectId(payload._id);
       let result = await dbcontrol.update(payload); 
       res.send(result);
    } catch (error) {
        res.send({
            status:'error',
           mas:'somthing went wrong',
            error
        }) 
    }
})
app.post('/adddata',async(req,res)=>{
    try {
        let payload = req.body;
       let result = await dbcontrol.addData(payload); 
       res.send(result);
    } catch (error) {
        res.send({
            status:'error',
           mas:'somthing went wrong',
            error
        }) 
    }
})
const port = 3000;
const hostname = 'localhost';
app.listen(port, async () => {
    await connect();
  console.log(`Server running on http://${hostname}:${port}/`);
});

