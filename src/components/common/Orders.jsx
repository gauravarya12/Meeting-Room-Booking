import React from 'react'
import { connect } from 'react-redux'

class Orders extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currentUserHistory: []
    }
  }

  componentDidMount () {
    this.setState({
      currentUserHistory: this.props.orderHistory[this.props.match.params.username]
    })
  }

  render () {
    return (
      <>
        <div className='container-fluid mt-5 d-flex justify-content-around'>
          <div className='col-lg-8 col-md-10 col-sm-12 col-12 font-weight-bold'>
            <table className='table table-bordered table-hover shadow-lg'>
              <thead className='thead-dark'>
                <tr>
                  <th>Booking ID</th>
                  <th>Room Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {this.state.currentUserHistory.map((e, i) => <tr key={i + 1}>
                  <td>{e.bookingId}</td>
                  <td>{e.roomName}</td>
                  <td>{new Date(e.startDate).toDateString()}</td>
                  <td>{new Date(e.endDate).toDateString()}</td>
                  <td>{e.totalBill}</td>
                </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  orderHistory: state.orderHistory
})

export default connect(mapStateToProps, null)(Orders)
