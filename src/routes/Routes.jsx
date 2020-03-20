import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'
import { connect } from 'react-redux'
import Dashboard from '../components/common/Dashboard'
import Booking from '../components/common/Booking'
import Confirmation from '../components/common/Confirmation'
import Orders from '../components/common/Orders'

class Routes extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' render={(props) => this.props.isLogged ? <Redirect to='/dashboard' /> : <Login {...props} />} />
        <Route path='/login' render={(props) => !this.props.isLogged ? <Login {...props} /> : <Redirect to='/dashboard' />} />
        <Route path='/signup' render={(props) => this.props.isLogged ? <Redirect to='/dashboard' /> : <Signup {...props} />} />
        <Route path='/dashboard' render={(props) => this.props.isLogged ? <Dashboard {...props} /> : <Redirect to='/login' />} />
        <Route path='/booking/:username' render={(props) => this.props.isLogged ? <Booking {...props} /> : <Redirect to='/login' />} />
        <Route path='/confirmation' render={(props) => this.props.isLogged ? <Confirmation {...props} /> : <Redirect to='/login' />} />
        <Route path='/order/:username' render={(props) => this.props.isLogged ? <Orders {...props} /> : <Redirect to='/login' />} />
      </Switch>
    )
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.isLogged
})

export default connect(mapStateToProps)(Routes)
