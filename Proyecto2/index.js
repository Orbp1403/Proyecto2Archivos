const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser')
var http = require('http');

app.set('host', '192.168.1.9');
app.set('port', 8000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json({limit: '15mb'}));
app.use(express.urlencoded({limit: '15mb'}));

var server = http.createServer(app);
var io = require('socket.io').listen(server);
io.on('connection', (socket)=>{
    console.log('new connection made')

    socket.on('join', function(data){
        console.log(data.room);
        socket.join(data.room);
        console.log('conectado ' + data.user);
        socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'se conecto'})
    })

    socket.on('leave', function(data){
        console.log(data.room);
        console.log('desconectado ' + data.user);
        socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'se desconecto'})
        socket.leave(data.room);
    })

    socket.on('message', function(data){
        console.log('mensaje', data);
        socket.broadcast.to(data.room).emit('new message', {tipo: "r", mensaje: data.message})
    })
})

app.use(require('./rutas/tasks'));
app.use(express.static(path.join(__dirname, 'dist/cliente')));

server.listen(app.get('port'));