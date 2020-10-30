import http from '../../../http/request';
import { ADDCART_API, GETCARTDATA_API, UPDATECART, UPDATECARTALL, DELETE_API } from '../../../http/api';

import {put, call, takeLatest} from 'redux-saga/effects';

/* 加入购物车 */
let setAddStatus = (num) => {
    return {
        type: 'cart/setAddStatus',
        value: num
    }
}
let addCart = async (data) => {
    var res = await http.post(ADDCART_API, data);
    return res.code;
}
function *fetchAddCart({data}){
    yield put( setAddStatus(0) )
    var res = yield call( addCart, data );
    if(res === 0){
        yield put( setAddStatus(1) )
    }
}

/* 获取购物车数据 */
let setCartData = (data) => {
    return {
        type: 'cart/setCartData',
        value: data
    }
};
let getCartData = async () => {
    var res = await http.get(GETCARTDATA_API);
    return res.data
}
function *fetchCartData(){
    var res = yield call( getCartData );
    yield put( setCartData(res) );
}

/* 修改购物车数据(单个) */
let updataCartData = (data) => {
    return {
        type: 'cart/updataCartData',
        id: data.id,
        key: data.key,
        value: data.value
    }
}
let modifyCartData = async (data) => {
    var res= await http.post(UPDATECART, data);
    return res.code;
};
function *fetchUpdataCartData({data}){
    var res = yield call( modifyCartData, data );
    if(res === 0){
        yield put( updataCartData(data) )
    }
};

/* 修改购物车数据(批量)(choosed 选中状态) */
let updataAllCartData = (value) => {
    return {
        type: 'cart/updataAllCartData',
        value
    }
}
let modifyAllCartData = async (value) => {
    var res= await http.post(UPDATECARTALL, {value});
    return res.code;
};
function *fetchUpdataAllCartData({value}){
    var res = yield call( modifyAllCartData, value );
    if(res === 0){
        yield put( updataAllCartData(value) )
    }
};

/* 删除购物车数据 */
let delCartData = (id) => {
    return {
        type: 'cart/delete',
        id,
    }
}
let deleteCartData = async (id) => {
    var res= await http.post(DELETE_API, {id});
    return res.code;
};
function *fetchDelCartData({id}){
    var res = yield call( deleteCartData, id );
    if(res === 0){
        yield put( delCartData(id) )
    }
};


function *effect(){
    yield takeLatest('cart/addCart', fetchAddCart);
    yield takeLatest('cart/getCartData', fetchCartData);
    yield takeLatest('cart/updata', fetchUpdataCartData );
    yield takeLatest('cart/updateAll', fetchUpdataAllCartData );
    yield takeLatest('cart/deleteData', fetchDelCartData );
}

export default effect;
