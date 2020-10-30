import React from 'react'
import AppScroll from '../../../components/app-scroll/app-scroll';
import { LazyLoadImage } from 'react-lazy-load-image-component';
export default function list(props) {
    var goodsDetail = (id)=>()=>{
        props.history.push('/detail/' + id);
    }
    return (
        <div className="list">
            <AppScroll className="scroll">
                {
                    props.data.map( cate => (
                        <div key={cate.category.id}  className="list-cates">
                            <div className="cates-title">
                                <h3>{cate.category.name}</h3>
                                <h4>{cate.category.frontName}</h4>
                            </div>
                            <div className="cates-list">
                                {
                                    cate.itemList.map(item => (
                                        <div className="cates-list-item" key={item.id} onClick={goodsDetail(item.id)} >
                                            {/* <img src={item.listPicUrl} alt=""/> */}
                                            <LazyLoadImage src={item.listPicUrl} />
                                            {
                                                item.listPromBanner ? 
                                                <div className="prom">
                                                    <div className="left" style={{backgroundImage: `url(${item.listPromBanner.bannerTitleUrl})`}} >
                                                        <span>{item.listPromBanner.promoTitle}</span>
                                                        <span>{item.listPromBanner.promoSubTitle}</span>
                                                    </div>
                                                    <div className="right">
                                                        <img src={item.listPromBanner.bannerContentUrl} alt=""/>
                                                        {item.listPromBanner.content}
                                                    </div>
                                                </div> :
                                                <div className="simple">{item.simpleDesc}</div>
                                            }
                                            <h3>{item.name}</h3>
                                            <h4>￥{item.retailPrice}</h4>

                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ) )
                }
            </AppScroll>
        </div>
    )
}
