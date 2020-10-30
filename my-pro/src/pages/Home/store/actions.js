import http from '../../../http/request';
import { HOME_API } from '../../../http/api';

/* 异步事件 */
export const getHomeDate = () => async (dispatch) => {
    var {banner, type, goodsList} = await http.get(HOME_API);
    dispatch( setHomeDate({banner, types: type, goodsList}) );
}


/* 同步事件 */
var setHomeDate = ({banner, types, goodsList}) => ({
    type: 'home/setData',
    banner,
    types,
    goodsList
})
