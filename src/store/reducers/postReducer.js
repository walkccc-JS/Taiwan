const initState = {
  posts: [
    { id: '1', title: 'Title 1', content: 'blah' },
    { id: '2', title: 'Title 2', content: 'blah' },
    { id: '3', title: 'Title 3', content: 'blah' }
  ]
}

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_POST':
      console.log('created post', action.post)
      return state
    case 'CREATE_POST_ERROR':
      console.log('created post error', action.err)
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