import http from '../../../http/request';
import { GETDETAIL_API } from '../../../http/api';
import {put, call, takeLatest} from 'redux-saga/effects';

var getDetail = async (id) => {
    var data = await http.get( GETDETAIL_API, {id} );
    var bannerList = Object.entries(data.itemDetail).filter( ([key]) => key.startsWith('picUrl') ).map(([key,value])=>value);
    var info = {
        id: data.id,
        detailHtml: data.itemDetail.detailHtml,
        videoInfo: data.itemDetail.videoInfo,
        name: data.name,
        bannerList,
        retailPrice: data.retailPrice,
        counterPrice: data.counterPrice,
        recommendReason: data.recommendReason,
        detailPromBanner: data.detailPromBanner && {
            content: data.detailPromBanner.content,
            subContent: data.detailPromBanner.subContent,
            cntDownText: data.detailPromBanner.cntDownText,
            countdown: data.detailPromBanner.countdown,
            bannerContentUrl: data.detailPromBanner.bannerContentUrl,
        },
        skuFreight: {
            title: data.skuFreight.title,
            freightInfo: data.skuFreight.freightInfo,
        },
        shoppingReward:{
            name: data.shoppingReward.name,
            rewardDesc: data.shoppingReward.rewardDesc,
            rewardValue: data.shoppingReward.rewardValue,
        },
        skuSpecList: data.skuSpecList,
        skuMap: data.skuMap,
        primaryPicUrl: data.primaryPicUrl
    }
    return info;
};

var setDetail = (data)=>{
    return {
        type: 'detail/setDetail',
        value: data
    }
};
var setLoad = (data) => ({
    type: 'detail/setLoading',
    value: data
});

function *fetchDetail({id}){
    yield put(setDetail({}));
    yield put(setLoad(true));
    var result = yield call(getDetail,id);
    yield put(setDetail(result));
    yield put(setLoad(false));
}

function *effect(){
    yield takeLatest('detail/getDetail', fetchDetail);
};

export default effect;