const initState = {
  projects: [
    { id: '1', title: 'Title 1', content: 'blah' },
    { id: '2', title: 'Title 2', content: 'blah' },
    { id: '3', title: 'Title 3', content: 'blah' }
  ]
}

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT':
      console.log('created project', action.project)
      return state
    case 'CREATE_PROJECT_ERROR':
      console.log('created project error', action.err)
      return state
    case 'DELETE_PROJECT':
      console.log('deleted project', action.projectId)
      return state
    case 'DELETE_PROJECT_ERROR':
      console.log('deleted project error', action.err)
      return state
    default:
      return state
  }
}

export default projectReducer