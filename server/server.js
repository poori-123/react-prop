const http = require('http');
const app  = require('./app');

var server = http.createServer(app);

server.on('error', (error)=>{
    console.log('服务启动失败!');
    console.log(error);
})

server.listen(8000,'localhost', ()=>{
    console.log('服务启动成功!');
    console.log('http://localhost:8000');
})