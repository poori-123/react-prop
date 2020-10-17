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
        component: lazy(()=>import('../pages/Cart/root/cart'))
    },
    {
        path: '/mine',
        component: lazy(()=>import('../pages/Mine/root/mine'))
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
