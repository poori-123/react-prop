import React, { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AppScroll from '../../../components/app-scroll/app-scroll';
import ListItem from '../component/list-item';

import './style.scss';
export default function Cart() {

    var history = useHistory();

    var dispatch = useDispatch();

    var islogin = useSelector(state => state.userInfo.isLogin);
    var cartData = useSelector( state => state.cart.cartData );
    

    var totP = useMemo( ()=>{
        var p = 0;
        cartData.forEach( item => {
            if(item.choosed){
                p += Number( item.price )*item.count
            }
        } );
        p = p.toFixed(2);
        return p;
    }, [cartData] )
    var totC = useMemo( ()=>cartData.findIndex( item => !item.choosed ) === -1, [cartData] );

    useEffect(()=>{
        dispatch({
            type: 'cart/getCartData'
        })
    },[dispatch]);

    var changeAction = useCallback( (ev)=>{
        dispatch( {
            type: 'cart/updateAll',
            value: ev.target.checked
        } )
    },[dispatch] )

    return (
        <div className="page cart">
            {
                islogin ? (
                    <>
                        <h1>购物车</h1>
                        <AppScroll className="cartList" >
                            {
                                cartData.map( item => (
                                    <ListItem key={item._id} data={item} />
                                ) )
                            }
                        </AppScroll>
                        <div className="buy">
                            <div className="left">
                                <input type="checkbox" checked={totC} onChange = {changeAction} />
                                <span>全选</span>
                            </div>
                            <div className="mid">
                                总价: ￥ {totP}
                            </div>
                            <div className="right">
                                <span>去结算</span>
                            </div>
                        </div>
                    </>
                    
                ) : (
                    <button className="goLogin" onClick={()=>history.push('/login')} >登录</button>
                )
            }
            
        </div>
    )
}

