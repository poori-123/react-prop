var init = {
    data: {},
    loading: false
}
var reducer = ( state = init, action )=>{
    switch (action.type) {
        case 'detail/setLoading':
            return {
                ...state,
                loading: action.value
            };
        case 'detail/setDetail':
            return {
                ...state,
                data: action.value
            }
    
        default:
            return state;
    }
    
};
export default reducer;