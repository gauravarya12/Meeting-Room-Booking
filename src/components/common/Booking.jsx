import React from 'react'
import { addBooking, updateMeetingData } from '../../redux/action'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Booking extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      roomName: '',
      floor: '',
      startDate: '',
      endDate: '',
      bookingId: '',
      totalBill: 0
    }
  }

  componentDidMount () {
    const obj = this.props.location.state.obj
    const startDate = this.props.location.state.startDate
    const endDate = this.props.location.state.endDate
    this.setState({
      roomName: obj.meeting_room_name,
      floor: obj.floor,
      startDate: startDate,
      endDate: endDate,
      bookingId: 'MRBN' + (100000 + Math.floor(Math.random() * 100000)) + 'CNF',
      totalBill: obj.price_per_day * (Math.floor((endDate - startDate) / (24 * 1000 * 3600)) + 1)
    })
  }

  handleClick = () => {
    this.props.addBooking(this.props.match.params.username, this.state)
    this.props.updateMeetingData(this.state.roomName, [this.state.startDate, this.state.endDate])
  }

  render () {
    return (
      <div className='container mx-auto mt-5 justify-content-around'>
        <div className='col-lg-6 col-md-8 col-sm-10 col-12 mx-auto font-weight-bold'>
          <table className='table table-bordered table-hover shadow-lg'>
            <tbody>
              <tr>
                <td>Booking ID</td>
                <td>{this.state.bookingId}</td>
              </tr>
              <tr>
                <td>Name of Room</td>
                <td>{this.state.roomName}</td>
              </tr>
              <tr>
                <td>Floor</td>
                <td>{this.state.floor}</td>
              </tr>
              <tr>
                <td>Start Date</td>
                <td>{new Date(this.state.startDate).toDateString()}</td>
              </tr>
              <tr>
                <td>End Date</td>
                <td>{new Date(this.state.endDate).toDateString()}</td>
              </tr>
              <tr>
                <td>Total Bill</td>
                <td>Rs. {this.state.totalBill}</td>
              </tr>
            </tbody>
          </table>
          <div className='col-12 mx-auto d-flex justify-content-center'>
            <Link to='/confirmation'><button onClick={this.handleClick} className='btn btn-outline-info mt-2 mx-auto'>Confirm Booking</button></Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addBooking: (user, data) => dispatch(addBooking(user, data)),
  updateMeetingData: (name, data) => dispatch(updateMeetingData(name, data))
})

export default connect(null, mapDispatchToProps)(Booking)
