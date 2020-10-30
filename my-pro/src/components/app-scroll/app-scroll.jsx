import React, { Component, createRef } from 'react'
import './style.scss';
export default class appScroll extends Component {
    constructor(props){
        super(props);
        this.scroll = createRef();
    }
    render() {
        return (
            <div className={this.props.className + ' app-scroll'} ref={this.scroll}>
                <div className="scroll-wrap">
                    {this.props.children}
                </div>
            </div>
        )
    };
    componentDidMount(){
        var scroll = new window.IScroll(this.scroll.current, {
            click: false,
            tap: false,
            probeType: 3,

        });
        scroll.on('beforeScrollStart', ()=>{
            scroll.refresh();
        })
    }
}
