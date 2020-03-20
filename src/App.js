import React from 'react'
import Routes from './routes/Routes'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchData, logoutUser } from './redux/action'

class App extends React.Component {
  componentDidMount () {
    this.props.fetchMeetingData()
  }

  render () {
    return (
      <>
        <nav className='navbar navbar-expand-lg bg-light navbar-light shadow'>
          <Link to='/' className='navbar-brand text-info'>Home</Link>
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarToggler' aria-controls='navbarToggler' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse justify-content-end' id='navbarToggler'>
            {this.props.isLogged && (
              <h5 className='text-center text-info mr-3'>{this.props.currentUser.token}</h5>
            )}
            {this.props.isLogged ? (<><Link to={`/order/${this.props.currentUser.username}`}><button className='btn btn-outline-info mr-2'>Orders</button></Link>
              <Link to='/login'><button className='btn btn-outline-info' onClick={() => this.props.logoutUser()}>Logout</button></Link>
            </>)
              : <Link to='/signup'><button className='btn btn-outline-info'>Signup</button></Link>}
          </div>
        </nav>
        <Routes />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.isLogged,
  currentUser: state.currentUser
})

const mapDisptachToProps = (dispatch) => ({
  fetchMeetingData: () => dispatch(fetchData()),
  logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDisptachToProps)(App)
