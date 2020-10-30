import React from 'react'

var banner = React.forwardRef( (props, ref)=>(
    <div className="banner swiper-container" ref={ref} >
        <div className="swiper-wrapper">
            {props.data.map( item => (
                <div className="swiper-slide" key={item.id} >
                    <img src={item.picUrl} alt=""/>
                </div>
            ))}
            
        </div>
        {/* <div className="swiper-pagination"></div> */}
    </div>
) )

banner.displayName = 'banner';
export default banner;
