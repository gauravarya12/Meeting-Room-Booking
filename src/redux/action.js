import axios from 'axios'

const signupUser = (obj) => {
  return dispatch => {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8080/auth/register',
      data: obj
    }).then(res => dispatch(SIGNUP_SUCCESS(res.data))).catch(err => dispatch(SIGNUP_FAIL(err.message)))
  }
}

const SIGNUP_SUCCESS = (obj) => ({
  type: 'SIGNUP_SUCCESS',
  signupResponse: obj
})

const SIGNUP_FAIL = (message) => ({
  type: 'SIGNUP_FAIL',
  errorMessage: message
})

const loginUser = (obj) => {
  return dispatch => {
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8080/auth/login',
      data: obj
    }).then(res => {
      if (!res.data.error) {
        axios.defaults.headers.common.Authorization = 'Bearer ' + res.data.token
        axios({
          method: 'get',
          url: `http://127.0.0.1:8080/user/${obj.username}`
        }).then(res => dispatch(LOGIN_SUCCESS(res.data))).catch(err => dispatch(LOGIN_FAIL(err.message)))
      } else {
        return dispatch(LOGIN_FAIL(res.message))
      }
    }).catch(err => dispatch(LOGIN_FAIL(err.message)))
  }
}

const LOGIN_SUCCESS = (obj) => ({
  type: 'LOGIN_SUCCESS',
  data: obj
})

const LOGIN_FAIL = (message) => ({
  type: 'LOGIN_FAIL',
  message: message
})

const logoutUser = () => ({
  type: 'LOGOUT_USER'
})

const fetchData = () => {
  return dispatch => {
    axios({
      method: 'get',
      url: '/data.json'
    }).then(res => {
      const data = res.data.map(e => ({
        ...e,
        booked: []
      }))
      data.forEach(e => {
        delete e.start_date
        delete e.end_data
      })
      dispatch(fetchDataSuccess(data))
    })
  }
}

const fetchDataSuccess = (data) => ({
  type: 'FETCH_DATA',
  data: data
})

const addBooking = (user, data) => ({
  type: 'ADD_BOOKING',
  data: data,
  user: user
})

const updateMeetingData = (name, data) => ({
  type: 'UPDATE_MDATA',
  name: name,
  data: data
})

export { signupUser, loginUser, logoutUser, fetchData, addBooking, updateMeetingData }
