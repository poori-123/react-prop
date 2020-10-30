const express = require('express');
const axios  = require('axios');
const url = require('url');

const router = new express.Router();

router.get('/home', async (req,res)=>{
    var data = await axios.get( 'https://m.you.163.com/xhr/index.json?__timestamp=' + Date.now() )
    
    const banner = data.data.data.data.focusList.map( item => ({
        id: item.id,
        picUrl : item.picUrl
    }) );

    const type = data.data.data.data.kingKongModule.kingKongList.filter( (item,index) => index > 0 && index <= 8 );
    const type2 = type.map( item => {
        var { query: {categoryId} } = url.parse(item.schemeUrl, true);
        return {
            picUrl: item.picUrl,
            id: categoryId,
            text: item.text
        }
    });

    const newGoodsData = data.data.data.data.newItemList.map(item => ({
        id: item.id,
        name: item.name,
        picUrl: item.primaryPicUrl,
        price: item.retailPrice
    }))

    res.json({code: 0, message: '获取成功!', banner, type: type2, goodsList: newGoodsData })
});

router.get('/list', async (req,res)=>{
    var data = await axios.get( `https://m.you.163.com/item/list.json?__timestamp=${Date.now()}&style=pd&categoryId=${req.query.typeId}` );
    var list = data.data.data.categoryItemList.map(cate => ({
        category: {
            id: cate.category.id,
            name: cate.category.name,
            frontName: cate.category.frontName
        },
        itemList: cate.itemList.map( item => ({
            id: item.id,
            name: item.name,
            listPicUrl: item.listPicUrl,
            simpleDesc: item.simpleDesc,
            listPromBanner: item.listPromBanner,
            retailPrice: item.retailPrice,
            counterPrice: item.counterPrice,
            itemTagList: item.itemTagList
        }) )
    }) )
    res.json(list);
});

router.get('/detail', async (req,res)=>{
    var id = req.query.id;
    var {data: {item}} = await axios.get('https://m.you.163.com/item/detail?id='+id);
    res.json(item);
})

module.exports = router;