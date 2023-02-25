export const MoviesReducer = (state, action) => {
    switch(action.type){
        case 'addFavMovie':
            return [...state, action.payload]
        case 'deleteFavMovie':
            return state.filter(movie => movie != action.payload)
        default:
            return state
    }
}