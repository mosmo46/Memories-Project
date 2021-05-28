import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js'

const app = express()
dotenv.config()
app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use('/posts',postRoutes)
app.get('/',(req,res)=>{res.send('Welcome to my API')})


mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>{console.log(`Server Running on PORT ${PORT}`)}))
.catch((err)=>console.log(err.message))

mongoose.set('useFindAndModify', false);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}