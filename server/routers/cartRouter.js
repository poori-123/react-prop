const {Router} = require('express');
const JWT = require('jsonwebtoken');
const Cart = require('../model/Cart');

var router = new Router();

/* 加入购物车 */
router.post('/add', async (req,res)=>{
    var data = req.fetchBody;
    const token = req.headers['authorization'].replace('Bearer ', '');
    const result = JWT.verify(token, 'hello world');
    var userId = result._id;
    var isHave = await Cart.findOne({user: userId, goodsId: data.goodsId, selectedId: data.selectedId});
    if(isHave){
        var id = isHave._id;
        var count = Number(isHave.count);
        var newCart = await Cart.findByIdAndUpdate( id, { count: count + Number(data.count) } );
    }else{
        var newCart = await new Cart({
            ...data,
            user: userId
        }).save();
    }
    res.json({code: 0, message: '添加成功!'});
});

/* 获取购物车数据 */
router.get('/getData', async (req,res)=>{
    const token = req.headers['authorization'].replace('Bearer ', '');
    const result = JWT.verify(token, 'hello world');
    var id = result._id;
    var data = await Cart.find({user: id});
    res.json({code: 0, message: '获取成功!', data});
})

/* 修改购物车数据 */
router.post('/update', async (req,res)=>{
    var { id, key, value } = req.fetchBody;
    var result = await Cart.findByIdAndUpdate( id, { [key]: value } );
    if(result){
        res.json({code:0 , message: '修改成功!'});
    }
});

/* 修改购物车数据(批量)(choosed 选中状态) */
router.post('/updateAll', async (req,res)=>{
    var { value } = req.fetchBody;

    const token = req.headers['authorization'].replace('Bearer ', '');
    const result = JWT.verify(token, 'hello world');
    var id = result._id;

    var up = await Cart.updateMany( {user: id}, { choosed: value } );
    if(up){
        res.json({code:0 , message: '修改成功!'});
    }
});

/* 删除购物车数据 */
router.post('/delete', async (req,res)=>{
    var { id } = req.fetchBody;

    var result = await Cart.findOneAndDelete(id);
    res.json({code: 0, message: '删除成功！'});



})


module.exports = router;