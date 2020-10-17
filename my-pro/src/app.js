import React, {Suspense} from 'react'

import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from './router/index';

import './style.scss';

export default function app() {
    var navList = [
        {
            id: 0,
            path: '/home',
            name: '首页',
            icon: ''
        },
        {
            id: 1,
            path: '/category',
            name: '分类',
            icon: ''
        },
        {
            id: 2,
            path: '/cart',
            name: '购物车',
            icon: ''
        },
        {
            id: 3,
            path: '/mine',
            name: '我的',
            icon: ''
        },
    ]
    return (
        <Suspense fallback={<div>loading...</div>} >
            <Router>
                <div className="app">
                    {renderRoutes(routes)}

                    <div className="botNav">
                        {
                            navList.map(item => (
                                <NavLink to={item.path} key={item.id} >{item.name}</NavLink>
                            ))
                        }
                    </div> 
                    
                </div>
            </Router>
        </Suspense>
        
        
    )
}
