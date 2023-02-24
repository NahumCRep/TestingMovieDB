export const MoviesReducer = (state, action) => {
    switch(action.type){
        case 'addFavMovie':
            return [...state, action.payload]
        case 'deleteFavMovie':
            const list = state.filter(movie => movie.id != action.payload)
            return list
        default:
            return state
    }
}