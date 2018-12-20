const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    // Auth
    case 'SIGNUP':
      console.log('SIGNUP')
      return { ...state, authError: null }
    case 'SIGNUP_ERR':
      console.log('SIGNUP_ERR')
      return { ...state, authError: action.err.message }
    case 'SIGNIN':
      console.log('SIGNIN')
      return { ...state, authError: null }
    case 'SIGNIN_ERR':
      console.log('SIGNIN_ERR')
      return { ...state, authError: action.err.message }
    case 'SIGNOUT':
      console.log('SIGNOUT')
      return { ...state, authError: null }
    case 'SIGNOUT_ERR':
      console.log('SIGNOUT_ERR')
      return { ...state, authError: action.err.message }

    // Update email
    case 'UPDATE_EMAIL':
      console.log('UPDATE_EMAIL')
      return { state, authError: null }
    case 'UPDATE_EMAIL_ERR':
      console.log('UPDATE_EMAIL_ERR')
      return { ...state, authError: action.err.message }

    // Update password
    case 'UPDATE_PASSWORD':
      console.log('UPDATE_PASSWORD')
      return { state, authError: null }
    case 'UPDATE_PASSWORD_ERR':
      console.log('UPDATE_PASSWORD_ERR')
      return { ...state, authError: action.err.message }

    // Update user
    case 'UPDATE_USER':
      console.log('UPDATE_USER')
      return state
    case 'UPDATE_USER_ERR':
      console.log('UPDATE_USER_ERR')
      return state

    case 'UPDATE_USER_IMAGE':
      console.log('UPDATE_USER_IMAGE', action.imageURL)
      return state
    case 'UPDATE_USER_IMAGE_ERR':
      console.log('UPDATE_USER_IMAGE_ERR')
      return state

    // Delete user
    case 'DELETE_USER_AUTH':
      console.log('DELETE_USER_AUTH')
      return { state, authError: null }
    case 'DELETE_USER_AUTH_ERR':
      console.log('DELETE_USER_AUTH_ERR')
      return { ...state, authError: action.err.message }
    case 'DELETE_USER':
      console.log('DELETE_USER')
      return state
    case 'DELETE_USER_ERR':
      console.log('DELETE_USER_ERR')
      return state
    default:
      return state
  }
}

export default authReducer