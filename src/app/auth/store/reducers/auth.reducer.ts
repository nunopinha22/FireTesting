import { AuthActions, AuthActionTypes } from '../actions/auth.action'

export interface AuthState {
  authorized: boolean
  isRegister: boolean
  loggedUser: any
  businessData: any
  userToken: string
  loading: boolean
  hasLoginError: boolean
}

const initialState: AuthState = {
  authorized: false,
  isRegister: false,
  loggedUser: null,
  businessData: null,
  userToken: null,
  loading: false,
  hasLoginError: false,
}

export const reducerName = 'auth'

export function AuthReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_ATTEMPT: {
      return Object.assign({}, state, {
        loading: true,
        loggedUser: action.payload,
      })
    }

    case AuthActionTypes.LOGIN_FAILURE: {
      return Object.assign({}, initialState, { hasLoginError: true })
    }

    case AuthActionTypes.LOGIN_SUCCESS: {
      const auth = {
        authorized: true,
        userToken: action.payload.token,
        loggedUser: null,
        loading: false,
        hasLoginError: false,
      }
      return Object.assign({}, state, auth)
    }
    case AuthActionTypes.REGISTER_ATTEMPT: {
      return Object.assign({}, state, {
        loading: true,
        loggedUser: action.payload,
      })
    }

    case AuthActionTypes.REGISTER_FAILURE: {
      return Object.assign({}, initialState, { hasLoginError: true })
    }

    case AuthActionTypes.REGISTER_SUCCESS: {
      const auth = {
        isRegister: true,
        loading: false,
        loggedUser: action.payload,
        hasLoginError: false,
      }
      return Object.assign({}, state, auth)
    }

    case AuthActionTypes.MANAGE_BUSINESS_ATTEMPT: {
      return Object.assign({}, state, {
        loading: true,
        businessData: action.payload,
      })
    }

    case AuthActionTypes.MANAGE_BUSINESS_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        isRegister: false,
        loggedUser: null,
        hasLoginError: false,
        userToken: null,
      })
    }

    case AuthActionTypes.MANAGE_BUSINESS_FAILURE: {
      return Object.assign({}, state, {
        hasLoginError: true,
      })
    }

    case AuthActionTypes.LOGOUT_FAILURE:
    case AuthActionTypes.LOGOUT_SUCCESS: {
      return initialState
    }

    default:
      return state
  }
}
