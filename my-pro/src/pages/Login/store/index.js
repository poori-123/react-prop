var init = {
    isLogin: false,
    loginStatus: 0 , /* 登录状态， 0为常态， 1为登录成功， 2为登陆失败 */
}
var reducer = ( state = {init}, action)=>{
    switch (action.type) {
        case 'user/setIsLogin':
            return {
                ...state,
                isLogin: action.value
            };
        case 'user/setLoginStaus':
            return {
                ...state,
                loginStatus: action.value
            }
    
        default:
            return state;
    }
};
export default  reducer;