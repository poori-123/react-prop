import React, { useCallback, useState, useMemo, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Toast } from 'antd-mobile';

import AppScroll from '../../../components/app-scroll/app-scroll';

export default function Selector(props) {
    var dispatch = useDispatch();

    var first = useRef(true);

    var data = useSelector(state=> state.detail.data);
    var addStatus = useSelector( state => state.cart.addStatus);

    var [ selectedArr, setSelectedArr ] = useState(()=>{
        return new Array( data.skuSpecList.length ).fill(null);
    });
    var [ count, setCount ] = useState(1);
    
    /* 监听添加状态变化，给出提示 */
    useEffect( ()=>{
        if(first.current){
            first.current = false;
            return
        }
        if(addStatus === 1){
            Toast.info('添加成功! ', 1);
            props.close();
        }
    }, [addStatus, props] )

    var imgUrl = useMemo( ()=>{
        var index = selectedArr.findIndex( item => item === null );
        if(index !== -1){
            return data.primaryPicUrl
        }else{
            var str = selectedArr.join(';');
            return data.skuMap[str].pic || data.primaryPicUrl;
        }
    },[selectedArr,data] );

    var price = useMemo( ()=>{
        var index = selectedArr.findIndex( item => item === null );
        if(index !== -1){
            return data.retailPrice
        }else{
            var str = selectedArr.join(';');
            return data.skuMap[str].retailPrice;
        }
    },[selectedArr,data] );

    var listStr = useMemo( ()=>{
        var index = selectedArr.findIndex( item => item !== null );
        if(index !== -1){
            var tmp = '';
            selectedArr.forEach( (item,index) => {
                if(item !== null ){
                    var n = data.skuSpecList[index].skuSpecValueList.findIndex( i => i.id === item );
                    tmp += data.skuSpecList[index].skuSpecValueList[n].value + ' ';
                }
            } )
            return `已选择：${tmp} `
        }else{
            return '请选择：请选择规格数量';
        }
    },[selectedArr,data] )

    var selectAction = useCallback((id,index) => () =>{
        if( selectedArr[index] !== id ){
            setSelectedArr( (selectedArr) => selectedArr.map( (item,i)=>{
                if(index === i){
                    return id
                }else{
                    return item
                }
            } ) );
        }else{
            setSelectedArr( (selectedArr) => selectedArr.map( (item,i)=>{
                if(index === i){
                    return null
                }else{
                    return item
                }
            } ) );
        }
        
        
    },[selectedArr]);

    var minuAction = useCallback( ()=>{
        if( count === 1 ){
            Toast.info('最少购买一件！', 1);
            return
        }
        setCount( count - 1 )
    },[count] )
    var addAction = useCallback( ()=>{
        setCount( count + 1 )
    },[count] )  

    var addCart = useCallback(()=>{
        var index = selectedArr.findIndex( item => item === null );
        if(index !== -1){
            var tmp = data.skuSpecList[index].name;
            Toast.info('请选择' + tmp, 1);
            return 
        };
        dispatch({
            type: 'cart/addCart',
            data: {
                goodsId: data.id,
                name: data.name,
                imgUrl,
                price,
                count,
                selectedId: selectedArr.join(';'),
                selectedArr: selectedArr.map( (item,index) => {
                    var i = data.skuSpecList[index].skuSpecValueList.findIndex( sku => sku.id === item );
                    return data.skuSpecList[index].skuSpecValueList[i];
                } ),
            }
        })
    },[selectedArr,count,data,imgUrl,price,dispatch]);
    var buyNow = ()=>{
        console.log('buy');
    }
    return (
        <div className="selector-wrap">
            <div className="selector">
                <AppScroll className="select-scroll">
                    <div className="base">
                        <div className="img"><img src={imgUrl} alt=""/></div>
                        <div className="info">
                            <h3>￥{price}</h3>
                            <h4>{listStr}</h4>
                        </div>
                    </div>
                    {
                        data.skuSpecList.map(( sku, index ) => (
                            <div key={sku.id} className="skuList">
                                <h4>{sku.name}</h4>
                                <div className="list-wrap">
                                    {
                                        sku.skuSpecValueList.map(item => (
                                            <span className={ (selectedArr[index] === item.id) ? 'active' : '' } onClick={ selectAction(item.id,index) } key={item.id} >{item.value}</span>
                                        ))
                                    }  
                                </div>
                                
                            </div>
                        ))
                    }
                    <div className="count">
                        <h4>数量</h4>
                        <div className="handler">
                            <span className={ count <= 1 ? 'default' : '' } onClick={ minuAction } >-</span>
                            <p>{count}</p>
                            <span onClick={ addAction } >+</span>
                        </div>
                    </div>
                </AppScroll>
                

                <div className="bot-bar">
                    <span onClick={ ()=>props.close() } >返回</span>
                    <p className="addCart" onClick={ addCart } >加入购物车</p>
                    <p className="buy" onClick={ buyNow }>立即购买</p>
                </div>
            </div>
        </div>
    )
}
