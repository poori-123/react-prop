import React, {useEffect, useRef, useState } from 'react';
import Swiper from "swiper/swiper-bundle"
import "swiper/swiper-bundle.css"
import playIcon from '../../../asset/play.webp';
export default function Banner({data,showIcon,setShowPlayer}) {
    var swiperWrap = useRef();
    var [ num, setNum ] = useState(1);
    useEffect(()=>{
        if(data){
            new Swiper( swiperWrap.current, {
                on: {
                    slideChangeTransitionEnd: function(){
                      setNum(this.activeIndex + 1)
                    },
                  },
            })
        }
    }, [data]);
    return (
        <div className="banner swiper-container" ref={swiperWrap} >
            <div className="swiper-wrapper">
                { data.map((item,index) => (
                    <div key={index} className="swiper-slide"><img src={item} alt=""/></div>
                )) }
            </div>
            <div className="num">
                <span>{num}</span>/<span>{data.length}</span>
            </div>
            {
                showIcon && <div className="playerIcon" onClick={()=>setShowPlayer(true)} ><img src={playIcon} alt=""/></div>
            }
            
        </div>
    )
}
