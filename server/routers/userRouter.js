const {Router} = require('express');
const JWT = require('jsonwebtoken');
var router = new Router();
var User = require('../model/User');

var list = {};

router.post('/getCode', (req,res)=>{
    var tel = req.fetchBody.tel;
    var tmp = '';
    for(let i = 0; i< 6; i++){
        var str = Math.floor(Math.random()*10);
        tmp += str;
    }
    list[tel] = tmp;
    res.json({code:0, message: '获取成功!', data: tmp});
});

router.post('/login', async (req,res) => {
    var { tel, code } = req.fetchBody;
    var c = list[tel];
    if( code !== c ){
        res.json({code: -1, message: '验证码输入错误!'});
        return;
    }
    var result = await User.findOne({tel});
    if(!result){
        result = await new User({tel}).save();
    }

    /* token */
    const token = JWT.sign(
        {
          tel,
          _id: result._id
        },
        "hello world",
        {
          expiresIn: '7d'
        }
    );

    res.json({code: 0, message: '登录成功!', token});
} ) ;

router.get('/islogin', async (req,res)=>{
    try {
        const token = req.headers['authorization'].replace('Bearer ', '');
        const result = JWT.verify(token, 'hello world');
        res.json({code: 0, message: '已登录!'});
    } catch (error) {
        res.json({code: -1, message: '为登录!'});
    }
    
})

module.exports = router;