import { ADD_LIKE, ADD_DISLIKE } from '../actions'

const initialState = {
  likes: 0,
  dislikes: 0
}

export default function tweetReducer(state = initialState, action) {
  switch (action.type){
    case ADD_LIKE:
      return {
        likes: action.payload
      }
    case ADD_DISLIKE:
      return {
        dislikes: action.payload
      }
    default:
      return state
  }
}