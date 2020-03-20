const initialStore = {
  signupResponse: {},
  message: '',
  isLogged: false,
  currentUser: {},
  meetingData: [],
  orderHistory: {}
}

const reducer = (state = initialStore, action) => {
  const tempObj = state.orderHistory
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      return { ...state, signupResponse: action.signupResponse }
    case 'SIGNUP_FAIL':
      return { ...state, message: action.message }
    case 'LOGIN_SUCCESS':
      return { ...state, isLogged: true, currentUser: action.data }
    case 'LOGIN_FAIL':
      return { ...state, isLogged: false, message: action.message }
    case 'LOGOUT_USER':
      return { ...state, signupResponse: {}, message: '', isLogged: false, currentUser: {} }
    case 'FETCH_DATA':
      return { ...state, meetingData: action.data }
    case 'ADD_BOOKING':
      if (action.user in tempObj) {
        tempObj[action.user].push(action.data)
      } else {
        tempObj[action.user] = [action.data]
      }
      return { ...state, orderHistory: tempObj }
    case 'UPDATE_MDATA':
      return { ...state, meetingData: state.meetingData.map(e => e.meeting_room_name === action.name ? { ...e, booked: [...e.booked, action.data] } : e) }
    default:
      return state
  }
}

export default reducer
