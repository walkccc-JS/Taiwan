const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGNUP':
      console.log('signup')
      return {
        ...state,
        authError: null
      }
    case 'SIGNUP_ERROR':
      console.log('signup error')
      return {
        ...state,
        authError: action.err.message
      }
    case 'SIGNIN':
      console.log('signin')
      return {
        ...state,
        authError: null
      }
    case 'SIGNIN_ERROR':
      console.log('signin error')
      return {
        ...state,
        authError: 'signin failed'
      }
    case 'SIGNOUT':
      console.log('signout')
      return state
    case 'UPDATE_EMAIL':
      console.log('updated email')
      return state
    case 'UPDATE_EMAIL_ERROR':
      console.log('updated email error')
      return state
    case 'UPDATE_PASSWORD':
      console.log('updated password')
      return state
    case 'UPDATE_PASSWORD_ERROR':
      console.log('updated password error')
      return state
    case 'UPDATE_USER':
      console.log('updated user')
      return state
    case 'UPDATE_USER_ERROR':
      console.log('updated user error')
      return state
    default:
      return state
  }
}

export default authReducer