const http = require('http');
const mongoose = require('mongoose');
const app  = require('./app');

mongoose.connect('mongodb://localhost:27017/ract-app', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (error)=>{
    if(error){
        console.log('数据库连接失败!');
        console.log(error);
        return;
    }else{
        var server = http.createServer(app);

        server.on('error', (error)=>{
            console.log('服务启动失败!');
            console.log(error);
        })

        server.listen(8000,'localhost', ()=>{
            console.log('服务启动成功!');
            console.log('http://localhost:8000');
        })
    }
})

