var initState = {
    dataList: {},
    loadStatus: false
};
export default ( state = initState, action ) => {
    if(action.type === 'setListData'){
        return {
            ...state,
            dataList: {
                ...state.dataList,
                [action.id]: action.list
            }
        }
    }
    if(action.type === 'setLoadStatus'){
        return {
            ...state,
            loadStatus: action.status
        }
    }
    return state;
}