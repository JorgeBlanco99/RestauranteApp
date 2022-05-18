export const actionType = {
    SET_USER: 'SET_USER',
};

const reducer = (state,action) => {
    console.log(action);
    switch (action.type) {
        case actionType.SET_USER:
            return{
                ...state,
                user: action.user,
            }
            break;
    
        default:
            return state;
            break;
    }
}
export default reducer;