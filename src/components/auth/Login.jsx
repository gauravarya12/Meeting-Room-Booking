import React from 'react';
import { connect } from 'react-redux'
import { loginUser } from '../../redux/action'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value.trim()
        })
    }

    handleClick = (e) => {
      e.preventDefault()
      this.props.loginUser(this.state)
    }

    render () {
        return (
            <div className = 'container mx-auto mt-5 justify-content-center'>
                <form className='col-lg-5 col-md-7 col-sm-9 col-12 mx-auto' onSubmit={this.handleClick}>
                    <div className='form-group'>
                      <label htmlFor='username'>Username</label>
                      <input type='text' placeholder='Enter Username' onChange={this.handleChange} value={this.state.username.trim()} className='form-control border-aqua' name='username' id='username' required></input>
                    </div>
                    <div className='form-group'>
                      <label htmlFor='password'>Password</label>
                      <input type='password' placeholder='Enter Password' value={this.state.password.trim()} className='form-control border-aqua' onChange={this.handleChange} name='password' id='password' required></input>
                    </div>
                    <div className='justify-content-center d-flex'>
                      <button type='submit' className='btn btn-outline-info mt-2 mx-auto'>Login</button>
                    </div>
                </form>
                {!this.props.isLogged ? <h3 className='text-center text-info'>{this.props.message}</h3> : <Redirect to='/dashboard' />}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  isLogged: state.isLogged,
  message: state.message
})

const mapDispatchToProps = (dispatch) => ({
  loginUser: (obj) => dispatch(loginUser(obj))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
