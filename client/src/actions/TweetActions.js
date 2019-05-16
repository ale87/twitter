import { ADD_LIKE } from '../actions'

export function addLike(payload){
  return {
    type: ADD_LIKE,
    payload
  }
}