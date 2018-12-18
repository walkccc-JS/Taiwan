const initState = {}

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_POST':
      console.log('ADD_POST', action.post)
      return state
    case 'ADD_POST_ERROR':
      console.log('ADD_POST_ERROR', action.err)
      return state
    case 'UPDATE_POST':
      console.log('UPDATE_POST', action.post)
      return state
    case 'UPDATE_POST_ERROR':
      console.log('UPDATE_POST_ERROR', action.err)
      return state
    case 'DELETE_POST':
      console.log('DELETE_POST', action.pid)
      return state
    case 'DELETE_POST_ERROR':
      console.log('DELETE_POST_ERROR', action.err)
      return state
    default:
      return state
  }
}

export default postReducer