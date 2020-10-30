import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import http from '../../http/request';
import { GETCODE_API } from '../../http/api';
import './style.scss';
import loadImg from '../../asset/timg.gif';
import { Toast } from 'antd-mobile';
export default function Login() {
    var [phone, setPhone] = useState('');
    var [code, setCode] = useState('');
    var [status, setStatus] = useState(1);  /* 验证码获取状态， 1为常态， 2为正在获取， 3为倒计时，4为重新获取 */
    var [time,setTime] = useState(60);
    var timer = useRef();

    var history = useHistory();

    var dispatch = useDispatch();
    var loginStatus = useSelector(state => state.userInfo.loginStatus);

    useEffect(() => {
        if(loginStatus === 1 ){
            clearInterval(timer.current);
            history.goBack();
        }else if(loginStatus === 2){
            // console.log('验证码输入有误，请从新输入!');
            Toast.info('验证码输入有误，请从新输入!', 1);
        }
    }, [loginStatus,history])

    /* 请求验证码 */
    var getCodeAction = useCallback( async ()=>{
        if(status !== 1 && status !== 4){
            return;
        }
        setStatus(2);
        var res = await http.post( GETCODE_API, { tel: phone } );
        if(res.code === 0){
            var count = 60;
            setTimeout(() => {
                setStatus(3);
                timer.current = setInterval(() => {
                    count = count - 1;
                    setTime( count );
                    if( count <= 0 ){
                        clearInterval(timer.current);
                        setStatus(4);
                        setTime( 60 );
                    }
                }, 1000);
                console.log(res.data);
            }, 2000);

        }else{
            setStatus(4);
            console.log('获取失败');
        }
    }, [phone,status]);

    var loginAction = useCallback( ()=>{
        dispatch({
            type: 'user/login',
            tel: phone,
            code
        })
    }, [phone,code,dispatch] )

    return (
        <div className="login">
            <h1>登录</h1>
            <div className="phone">
                <span>手机号:</span>
                <input type="text" placeholder="请输入手机号" value={phone} onChange={(ev)=>setPhone(ev.target.value)} />
            </div>
            <div className="code">
                <span>验证码:</span>
                <input type="text" placeholder="请输入验证码" value={code} onChange={(ev)=>setCode(ev.target.value)} />
                <i onClick={getCodeAction} style={ { background: (status !== 1 && status !== 4 ) && '#eee', color: (status !== 1 && status !== 4 ) && '#999' }} >
                    { status === 1 && '获取验证码' }
                    { status === 2 && <img src={loadImg} alt="" /> }
                    { status === 3 &&  `${ time }s后重新获取` }
                    { status === 4 &&  `重新获取` }
                </i>
            </div>
            <button onClick={loginAction} >登录</button>
        </div>
    )
}
