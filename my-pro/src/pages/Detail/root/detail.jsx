import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AppLoading from '../../../components/app-loading';
import AppScroll from '../../../components/app-scroll/app-scroll';
import Player from '../components/player';

import Banner from '../components/banner';
import Seletor from '../components/selector';

import './style.scss';
export default function Detail(props) {
    var params = useParams();
    var history = useHistory();
    var data = useSelector( state => state.detail.data );
    var loading = useSelector( state => state.detail.loading);
    var isLogin = useSelector( state => state.userInfo.isLogin );

    var [isShowSelector,setShowSelector] = useState(false);
    
    var showPlayerIcon = useMemo(()=>{
        if( data.videoInfo && (data.videoInfo.mp4VideoUrl || data.videoInfo.webmVideoUrl) ){
            return true;
        }else{
            return false;
        }
    }, [data.videoInfo]);
    var [ showPlayer, setShowPlayer ]  = useState(false);
    var dispatch = useDispatch();
    useEffect(()=>{
        if(params && params.id ){
            dispatch({
                type: 'detail/getDetail',
                id: params.id
            })
        }
    },[params,dispatch]);

    var showSelector = useCallback(()=>{
        setShowSelector(true)
    },[setShowSelector])

    return (
        <div className="detail">
            {loading && <AppLoading/>}
            <div className="top">
                <span className="iconfont iconzuo" onClick={ ()=>{history.goBack()} } ></span>
                <h1>商品详情</h1>
                <span></span>
            </div>
            {
                data.name && (
                    <AppScroll className="scroll">
                        { data.bannerList && <Banner setShowPlayer={setShowPlayer} showIcon={showPlayerIcon} data={data.bannerList} />}
                        { data.detailPromBanner && (
                            <div className="prombanner" style={{backgroundImage: `url(${data.detailPromBanner.bannerContentUrl})`}} >
                                <div className="left">
                                    <p>{data.detailPromBanner.content}</p>
                                    <p>{data.detailPromBanner.subContent}</p>
                                </div>
                                <div className="right">
                                    <p>{data.detailPromBanner.cntDownText}</p>
                                    <p>{ parseInt(data.detailPromBanner.countdown/86400000) + '天' }</p>
                                </div>
                            </div>
                        ) }
                        <div className="baseInfo">
                            <h3>到手价</h3>
                            <h4>￥{data.retailPrice} { data.counterPrice && <span>￥{data.counterPrice}</span>} </h4>
                            <h5>{data.name}</h5>
                        </div>
                        { data.recommendReason && (
                            <div className="recommend">
                                { data.recommendReason.map((item,index) => (
                                    <li key={index} className="item"> <span>{index+1}</span> {item}</li>
                                )) }
                            </div>
                        ) }
                        {
                            data.skuFreight && <div className="skuFreight">
                                <b>{data.skuFreight.title}:</b>
                                <i>{data.skuFreight.freightInfo}</i>
                                <span className="iconfont iconyou"></span>
                            </div>
                        }
                        {
                            data.shoppingReward && <div className="shoppingReward">
                                <b>{data.shoppingReward.name}:</b>
                                <i>{data.shoppingReward.rewardDesc}<strong>{data.shoppingReward.rewardValue}</strong> </i>
                                <span className="iconfont iconyou"></span>
                            </div>
                        }
                        {
                            data.detailHtml && ( <div className="content" dangerouslySetInnerHTML={{ __html: data.detailHtml }}></div> )
                        }
                    </AppScroll>
                )
            }
            
            { showPlayer && <Player url={data.videoInfo} setShowPlayer={setShowPlayer} />  }

            {
                isLogin || <div className="loginMark" onClick={()=>{ history.push('/login') }} ></div>
            }
            <div className="bot">
                <span className="iconfont iconfenxiang_2" onClick={()=>console.log('分享')} ></span>
                <span className="iconfont icongouwuche" onClick={()=>history.push('/cart')} ></span>
                <div className="addCart" onClick={ showSelector } >加入购物车</div>
                <div className="buynow" onClick={ showSelector } >立即购买</div>
            </div>
            {
                isShowSelector && <Seletor close={()=>{setShowSelector(false)}} />
            }
            
        </div>
    )
}

