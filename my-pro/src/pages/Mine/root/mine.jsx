import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './style.scss';
export default function Mine() {

    var history = useHistory();

    var islogin = useSelector(state => state.userInfo.isLogin);

    return (
        <div className="page mine">
            {
                islogin ? (
                    <h1>mine</h1>
                ) : (
                    <button className="goLogin" onClick={()=>history.push('/login')} >登录</button>
                )
            }
            
        </div>
    )
}

