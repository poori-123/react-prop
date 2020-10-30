import React, { Component, createRef } from 'react'

import { connect } from 'react-redux';

import { getHomeDate } from '../store/actions';

import AppScroll from '../../../components/app-scroll/app-scroll';

import Banner from '../component/banner';
import Types from '../component/types';
import GoodsList from '../component/goodsList';

import Swiper from "swiper/swiper-bundle"
import "swiper/swiper-bundle.css"

import './style.scss';

import topImg from '../../../asset/home-top.png';

class home extends Component {
    bannerRef = createRef();
    render() {
        return (
            <div className="page home">
                <div className="top">
                    <img src={topImg} alt=""/>
                </div>
                <AppScroll className="scroll">
                    <div className="bgImg"></div>
                    <div className="search">
                        <span className="iconfont iconsearch"></span>
                        <input type="text" placeholder="搜索商品-好货等你" />
                    </div>
                    <Banner data={this.props.banner} ref={ this.bannerRef }  />
                    <Types data={this.props.type} history={this.props.history} />
                    <GoodsList history={this.props.history} data={this.props.goodsList} />
                </AppScroll>
            </div>
        )
    };
    componentDidMount(){
        this.props.getInit();
    };
    componentDidUpdate(props){
        if(props.banner !== this.props.banner){
            new Swiper (this.bannerRef.current, {
                loop: true, 
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
                // pagination: {
                //   el: '.swiper-pagination',
                // },
            })        
        }
    }
}

export default connect(
    (state) => ({
        banner: state.home.banner,
        type: state.home.type,
        goodsList: state.home.goodsList
    }),
    (dispatch) => ({
        getInit: ()=>{
            dispatch( getHomeDate() );
        }
    })
)(home);
