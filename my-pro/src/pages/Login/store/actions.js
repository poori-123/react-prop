import { put, call, takeLatest } from 'redux-saga/effects';
import http from '../../../http/request';
import { GETISLOGIN_API, LOGIN_API } from '../../../http/api';

/* 验证是否登录 */
function setIsLogin(boo){
    return {
        type: 'user/setIsLogin',
        value: boo
    }
};
var getIsLogin = async ()=>{
    var res = await http.get(GETISLOGIN_API);
    if(res.code === 0){
        return true;
    }else{
        return false
    }
};
function *fetchIsLogin(){
    var token = localStorage.getItem('Token');
    if(!token){
        yield put(setIsLogin(false));
        return;
    }
    var res =yield call(getIsLogin);
    yield put(setIsLogin(res));
};

/* 登录 */
function setLoginStatus(num){
    return {
        type: 'user/setLoginStaus',
        value: num
    }
}
var login = async ( {tel,code} )=>{
    var res = await http.post(LOGIN_API, {tel,code} );
    localStorage.setItem('Token',res.token);
    return res.code
}
function *fetchLogin(data){
    var res = yield call(login, data );
    if(res === 0){
        yield put(setIsLogin(true)); /* 登录成功设置已登录，登录状态改为 1 */
        yield put(setLoginStatus(1));
    }else{
        yield put(setLoginStatus(2));
    }
};




function *effect(){
    yield takeLatest('user/isLogin', fetchIsLogin );
    yield takeLatest('user/login', fetchLogin);
}
export default effect;