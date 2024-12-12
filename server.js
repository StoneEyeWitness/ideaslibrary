const path = require('path');
const express = require('express');         
const cors = require('cors');
require('dotenv').config();    
const port = process.env.PORT;     
const connectDB = require('./config/db');

connectDB();

const app = express();     

// Static Folder
app.use(express.static(path.join(__dirname,'public')));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// Cors Middleware
app.use(cors({
    origin: ['http://localhost:5000','http://localhost:3000'],
    credentials: true
}));

const ideasRouter = require('./routes/ideas');                        

app.listen(port, () => console.log(`Server on port ${port}`));     

app.get('/', (request,response) => {
    response.json({ message:'Welcome' });            
});  
      
app.use('/api/ideas',ideasRouter);                                  
