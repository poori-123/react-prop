var init = {
    addStatus: 0, /* 加入购物车状态： 0为常态， 1为加入成功， 2为加入失败 */
    cartData: []
}
export default ( state = init, action )=>{
    switch (action.type) {
        case 'cart/setAddStatus':
            return {
                ...state,
                addStatus: action.value
            };
        case 'cart/setCartData':
            return {
                ...state,
                cartData: action.value
            };
        case 'cart/updataCartData':
            return {
                ...state,
                cartData: state.cartData.map( item => {
                    if(item._id === action.id){
                        return {
                            ...item,
                            [action.key]: action.value
                        }
                    }else{
                        return item
                    }
                } )
            };
        case 'cart/updataAllCartData':
            return {
                ...state,
                cartData: state.cartData.map( item => ({
                    ...item,
                    choosed: action.value
                }) )
            };
        case 'cart/delete':
            return {
                ...state,
                cartData: state.cartData.filter( item => item._id !== action.id )
            }
        default:
            return state;
    }
}