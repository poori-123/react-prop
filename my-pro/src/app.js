import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

// import { renderRoutes } from 'react-router-config';
import  renderRoutes  from './components/react-router-config.js';

import routes from './router/index';

import Loading from './components/loading/loading';

import './style.scss';
import './asset/iconfont.css';

export default function App() {
    var navList = [
        {
            id: 0,
            path: '/home',
            name: '首页',
            icon: 'iconicon4'
        },
        {
            id: 1,
            path: '/category',
            name: '分类',
            icon: 'iconbuoumaotubiao01'
        },
        {
            id: 2,
            path: '/cart',
            name: '购物车',
            icon: 'icongouwuche'
        },
        {
            id: 3,
            path: '/mine',
            name: '我的',
            icon: 'iconwode'
        },
    ];
    var dispatch = useDispatch();
    useEffect(()=>{
        dispatch({
            type: 'user/isLogin'
        })
    },[dispatch])
    return (
        <Router>
            <Suspense fallback={ <Loading/> } >
                {renderRoutes(routes)}
            </Suspense>

            <div className="botNav">
                {
                    navList.map(item => (
                        <NavLink to={item.path} key={item.id} >
                            <span className={'iconfont ' + item.icon}></span>
                            <span>{item.name}</span>
                        </NavLink>
                    ))
                }
            </div> 
                
        </Router>
        
        
    )
}
