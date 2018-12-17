const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    // Auth
    case 'SIGNUP':
      console.log('SIGNUP')
      return { ...state, authError: null }
    case 'SIGNUP_ERROR':
      console.log('SIGNUP_ERROR')
      return { ...state, authError: action.err.message }
    case 'SIGNIN':
      console.log('SIGNIN')
      return { ...state, authError: null }
    case 'SIGNIN_ERROR':
      console.log('SIGNIN_ERROR')
      return { ...state, authError: action.err.message }
    case 'SIGNOUT':
      console.log('SIGNOUT')
      return state

    // Update email
    case 'UPDATE_EMAIL':
      console.log('UPDATE_EMAIL')
      return { state, authError: null }
    case 'UPDATE_EMAIL_ERROR':
      console.log('UPDATE_EMAIL_ERROR')
      return { ...state, authError: action.err.message }

    // Update password
    case 'UPDATE_PASSWORD':
      console.log('UPDATE_PASSWORD')
      return { state, authError: null }
    case 'UPDATE_PASSWORD_ERROR':
      console.log('UPDATE_PASSWORD_ERROR')
      return { ...state, authError: action.err.message }

    // Update user
    case 'UPDATE_USER':
      console.log('UPDATE_USER')
      return state
    case 'UPDATE_USER_ERROR':
      console.log('UPDATE_USER_ERROR')
      return state

    // Delete user
    case 'DELETE_USER_AUTH':
      console.log('DELETE_USER_AUTH')
      return { state, authError: null }
    case 'DELETE_USER_AUTH_ERROR':
      console.log('DELETE_USER_AUTH_ERROR')
      return { ...state, authError: action.err.message }
    case 'DELETE_USER':
      console.log('DELETE_USER')
      return state
    case 'DELETE_USER_ERROR':
      console.log('DELETE_USER_ERROR')
      return state
    default:
      return state
  }
}

export default authReducer