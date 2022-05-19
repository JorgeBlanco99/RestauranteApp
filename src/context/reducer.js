export const actionType = {
    SET_USER: 'SET_USER',
    SET_FOOD_ITEMS: 'SET_FOOD_ITEMS',
    SET_CARD_SHOW: 'SET_CARD_SHOW',
    SET_CARD_ITEMS: 'SET_CARD_ITEMS',
};

const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case actionType.SET_USER:
            return{
                ...state,
                user: action.user,
            }
            break;
        case actionType.SET_FOOD_ITEMS:
            return{
                ...state,
                foodItems: action.foodItems,
            }
            break;
        case actionType.SET_CARD_SHOW:
                return{
                    ...state,
                    cartShow: action.cartShow,
                }
                break;
        case actionType.SET_CARD_ITEMS:
                return{
                    ...state,
                    cartItems: action.cartItems,
                }
                break;
                
        default:
            return state;
            break;
    }
}
export default reducer;