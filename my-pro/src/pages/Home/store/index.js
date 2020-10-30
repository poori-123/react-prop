var initState = {
    banner: [],
    type: [],
    goodsList: []
}
var reducer = (state = initState, action) => {
    if(action.type === 'home/setData'){
        return {
            banner: action.banner,
            type: action.types,
            goodsList: action.goodsList
        }
    }
    return state
};
export default reducer;