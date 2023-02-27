export const AuthReducer = (state, action) => {
    switch(action.type){
        case 'login':
            return {session_id: action.payload.session_id, status: action.payload.status}
        case 'logout':
            return {session_id: null, status: 'not-authenticated'}
        default:
            return state
    }
}