
export const listReducer = (state,action) => {
    switch (action.type) {
        case 'GET_USER_LISTS':
            return {
                ...state,
                lists: action.payload,
                ok: true,
            };
            
        default:
            break;
    }
}