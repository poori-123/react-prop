import http from '../../../http/request';
import { GETLISTDATA_PI } from '../../../http/api';

export const getListData = (id) => async (dispatch) => {
    dispatch(setLoadStatus(true));
    var res = await http.get( GETLISTDATA_PI, {typeId: id })
    dispatch(setListData(id, res));
    dispatch(setLoadStatus(false));
}

var setListData = (id, list) => ({
    type: 'setListData',
    id,
    list
});
var setLoadStatus = (boo) => ({
    type: 'setLoadStatus',
    status: boo
})
