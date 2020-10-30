import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';

export default [
    {
        path: '/',
        exact: true,
        render: () => <Redirect to="/home" />
    },
    {
        path: '/home',
        component: lazy(()=>import('../pages/Home/root/home'))
    },
    {
        path: '/category',
        component: lazy(()=>import('../pages/Category/root/category'))
    },
    {
        path: '/cart',
        component: lazy(()=>import('../pages/Cart/root/cart')),
        noCache: true
    },
    {
        path: '/mine',
        component: lazy(()=>import('../pages/Mine/root/mine'))
    },
    {
        path: '/detail/:id',
        component: lazy(()=>import('../pages/Detail/root/detail.jsx'))
    },
    {
        path: '/login',
        component: lazy(()=>import('../pages/Login/login'))
    },
    {
        path: '/404',
        component: lazy(()=>import('../pages/NotFound/notFound'))
    },
    {
        path: '',
        render: () => <Redirect to="/404" />
    }
]
