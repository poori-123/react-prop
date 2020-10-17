import React, { Component } from 'react'
import './style.scss';
export default class ErrorBoundary extends Component {
    constructor(props){
        super(props);
        this.state = {
            isError: false,
            error: ''
        }
    };
    errorCom = ()=>{
        return (
            <div className="error">
                <h1>出错了...</h1>
            </div>
        )
    };
    render() {
        return this.state.isError ? this.errorCom() : this.props.children
    };
    componentDidCatch(error){
        console.log('componentDidCatch');
        this.setState({ isError: true });
    }
}
