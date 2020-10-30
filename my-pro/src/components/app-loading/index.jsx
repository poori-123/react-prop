import React, { Component } from 'react'
import ReactDom from 'react-dom';
import img from '../../asset/timg.gif';
import './style.scss';
export default class appLoading extends Component {
    constructor(props){
        super(props);
        this.el = document.createElement('div');
        this.el.className = 'loading-wrap';
    };
    render() {
        return ReactDom.createPortal(
            <div className="app-loading">
                <img src={img} alt=""/>
            </div>,
            this.el
        )
    };
    componentDidMount(){
        document.querySelector('body').appendChild(this.el);
    };
    componentWillUnmount(){
        document.querySelector('body').removeChild(this.el);
    }
}

