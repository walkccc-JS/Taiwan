const initState = {}

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_POST':
      console.log('added post', action.post)
      return state
    case 'ADD_POST_ERROR':
      console.log('added post error', action.err)
      return state
    case 'UPDATE_POST':
      console.log('updated post', action.post)
      return state
    case 'UPDATE_POST_ERROR':
      console.log('updated post error', action.err)
      return state
    case 'DELETE_POST':
      console.log('deleted post', action.postId)
      return state
    case 'DELETE_POST_ERROR':
      console.log('deleted post error', action.err)
      return state
    default:
      return state
  }
}

export default postReducer