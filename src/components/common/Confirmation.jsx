import React from 'react'

class Confirmation extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      seconds: 5
    }
  }

  componentDidMount () {
    this.clear = setInterval(() => this.setState((prevState) => ({ seconds: prevState.seconds - 1 })), 1000)
  }

  componentDidUpdate () {
    if (this.state.seconds === 0) {
      this.props.history.replace('/')
    }
  }

  componentWillUnmount () {
    clearInterval(this.clear)
  }

  render () {
    return (
      <div className='container mx-auto mt-5'>
        <h2 className='text-center text-info display-4'>Booking Successful!!!</h2>
        <p className='text-center font-weight-bold display-5 text-danger'>You will be redirected to home page in {this.state.seconds} seconds.</p>
      </div>
    )
  }
}

export default Confirmation
