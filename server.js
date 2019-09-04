const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/api/departments', async(req, res, next) => {
    try{
        res.send(await db.getAllDepartments());
    }
    catch(ex){
        next(ex);
    }
})

app.get('/api/users', async(req, res, next) => {
    try{
        res.send(await db.getAllUsers());
    }
    catch(ex){
        next(ex);
    }
})

db.sync()
.then(() => app.listen(3000));
