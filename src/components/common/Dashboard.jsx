import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      pageNo: 1,
      dataToShow: [],
      proType: '',
      sortType: 'price',
      startDate: 0,
      endDate: 0,
      buttonClicked: false
    }
  }

  componentDidMount() {
    this.setState({
      dataToShow: this.props.meetingData.filter((e, i) => i >= 5*(this.state.pageNo - 1) && i < 5*this.state.pageNo),
      data: this.props.meetingData
    })
  }

  handlePagination = () => {
    this.setState({
      dataToShow: this.state.data.filter((e, i) => i >= 5*(this.state.pageNo - 1) && i < 5*this.state.pageNo)
    })
  }

  handleClick = (e) => {
    let pageNo = Number(e.target.value)
    this.setState({
      pageNo: pageNo
    }, () => this.handlePagination())
  }

  handleChange2 = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
        if (this.state.proType === 'price') {
            if (this.state.sortType === 'asc') {
                let x = this.state.data
                x.sort((a,b) => Number(a.price_per_day) - Number(b.price_per_day))
                this.setState({
                  data: x
                }, () => this.handlePagination())
            }
            else if (this.state.sortType === 'desc') {
                let x = this.state.data
                x.sort((a, b) => Number(b.price_per_day) - Number(a.price_per_day))
                this.setState({
                    data: x
                }, () => this.handlePagination())
            }
        }
        else if (this.state.proType === 'capacity') {
            if (this.state.sortType === 'asc') {
                let x = this.state.data
                x.sort((a,b) => Number(a.capacity) - Number(b.capacity))
                this.setState({
                  data: x
                }, () => this.handlePagination())
            }
            else if (this.state.sortType === 'desc') {
                let x = this.state.data
                x.sort((a, b) => Number(b.capacity) - Number(a.capacity))
                this.setState({
                    data: x
                }, () => this.handlePagination())
            }
        }
    })
  }

  handleDateChange = (e) => {
    this.setState({
      [e.target.id]: e.target.valueAsNumber
    })
  }

  searchRoom = (e) => {
    e.preventDefault()
    let x = this.props.meetingData.filter(el => {
        if (el.booked) {
          for (let i = 0; i < el.booked.length; i++) {
            if ((this.state.startDate <= el.booked[i][1] && this.state.startDate >= el.booked[i][0]) || (this.state.endDate >= el.booked[i][0] && this.state.endDate <= el.booked[i][1]) || (this.state.startDate <= el.booked[i][0] && this.state.endDate >= el.booked[i][1])) {
              return false
            }
          }
          return true
        }
        else {
          return true
        }
    })
    this.setState({
      data: x,
      buttonClicked: true
    }, () => this.handlePagination())
  }

  render () {
    let totalPages = Math.ceil(this.state.data.length/5)
    let arr = []
    for (let i = 1; i <= totalPages; i++) {
      arr.push(i)
    }
    return (
      <>
        <div className='container mx-auto mt-5'>
          <form onSubmit={this.searchRoom} className='row justify-content-around'>
            <div className='form-group mt-2 col-lg-6 col-md-8 col-sm-10 col-12'>
                <label htmlFor='date'>Please Choose Start Date</label>
                <input type='date' id='startDate' className='form-control' onChange = {this.handleDateChange} required></input>
            </div>
            <div className='form-group mt-2 col-lg-6 col-md-8 col-sm-10 col-12'>
                <label htmlFor='date'>Please Choose End Date</label>
                <input type='date' id='endDate' className='form-control' onChange={this.handleDateChange} min={(new Date(this.state.startDate)).toISOString().split('T')[0]} required></input>
            </div>
            <div className='justify-content-center col-10 d-flex'>
              <button className='btn btn-info' type='submit'>Search</button>
            </div>
          </form>
          <div className='justify-content-around row'>
            <div className='col-lg-6 col-md-8 col-sm-10 col-12'>
              <select onChange={this.handleChange2} name='proType' className='custom-select mt-2'>
                  <option value=''>Select Property Type</option>
                  <option value='price'>Price</option>
                  <option value='capacity'>Capacity</option>
              </select>
            </div>
            <div className='col-lg-6 col-md-8 col-sm-10 col-12'>
              <select onChange={this.handleChange2} name='sortType' className = 'custom-select mt-2'>
                  <option value=''>Select Sort Type</option>
                  <option value='asc'>Ascending</option>
                  <option value='desc'>Descending</option>
              </select>
            </div>
          </div>
          <div className='row d-flex justify-content-around'>
            {this.state.dataToShow.map((e, i) => <Card obj = {e} key = {i} startDate={this.state.startDate} endDate={this.state.endDate} buttonClicked={this.state.buttonClicked} />)}
          </div>
          <div className = 'row justify-content-center'>
            {arr.map(e => <button className='btn mr-2 mt-3 btn-secondary mb-3' onClick={this.handleClick} value={e} key={e}>{e}</button>)}
          </div>
        </div>
      </>
    )
  }
}

let Card = (props) => {
  return (
    <>
      <div className="card col-lg-5 col-md-7 col-sm-9 col-11 p-0 mt-3">
        <div className="card-header text-center">
            <h3>{props.obj.meeting_room_name.toUpperCase()}</h3>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">Floor: {props.obj.floor}</li>
            <li className="list-group-item">Capacity: {props.obj.capacity}</li>
            <li className="list-group-item">Price Per Day: Rs. {props.obj.price_per_day}</li>
        </ul>
        <div className='card-footer d-flex justify-content-center'>
          {props.buttonClicked ? <Link to={{pathname:`/booking/${props.currentUser.username}`, state:{obj: props.obj, startDate: props.startDate, endDate: props.endDate}}} ><button className='btn btn-outline-success mx-auto'>Book</button></Link>
          : <button className='btn btn-outline-danger' disabled>Book</button> }
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  meetingData: state.meetingData,
  currentUser: state.currentUser,
  orderHistory: state.orderHistory
})

// const mapDispatchToProps = dispatch => ({
  
// })

Card = connect(mapStateToProps, null)(Card)

export default connect(mapStateToProps, null)(Dashboard)
