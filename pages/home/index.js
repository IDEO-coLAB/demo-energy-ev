import React, { Component } from 'react'
import R from 'ramda'

// import local css as s.
import s from './styles.css'
// import global css as gs
import gs from './../../styles/grid.css'
import Ship from '../../components/Ship/Ship'

class CarSpot extends Component {
  render() {
    const left = `${this.props.left}px`
    const top = `${this.props.top}px`
    const theClass = (this.props.isFree)? s.spotFree : s.spotTaken
    return (
        <div>
          <div className={theClass} style={{left: left, top: top}}>
            <div style={{left: '50px', top: '300px'}} className={s.label}>{this.props.price}</div>
            <div style={{left: '50px', top: '450px'}} className={s.timeLabel}>{this.props.chargeTime}</div>
          </div>
        </div>
      )
  }
}

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {state: [
      { available: true, price: ''},
      { available: true, price: ''}
    ]}
  }

  componentDidMount() {
    const _this = this
    setInterval(() => {
      _this.updateState()
    }, 5000)
  }

  updateState() {
    let _this = this
    fetch('http://localhost:9000').then(res => {
      return res.json()
    }).then(json => {
      // const state = [
      //   {available: true, price: 1},
      //   {available: false, price: 2},
      // ]
      const parsed = JSON.parse(json)
      const state = R.map(value => {
        return {
          available: value['charging_station']['data'] !== 'occupied',
          price: value['charging_station']['price'],
          timeCharging: value['charging_station']['timeCharging']
        }
      }, R.values(parsed))

      debugger

      _this.setState({state: state})

    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const price0 = (this.state.state[0].price)? `$${this.state.state[0].price}` : ''
    const price1 = (this.state.state[1].price)? `$${this.state.state[1].price}` : ''
    const chargeTime0 = (this.state.state[0].timeCharging)? `Been charging for ${this.state.state[0].timeCharging.substring(0,6)} minutes` : ''
    const chargeTime1 = (this.state.state[1].timeCharging)? `Been charging for ${this.state.state[1].timeCharging.substring(0,6)} minutes` : ''
    return (
      <div>
        <CarSpot price={price0} left="100" top="100" isFree={this.state.state[0].available} chargeTime={chargeTime0} />
        <CarSpot price={price1} left="600" top="100" isFree={this.state.state[1].available} chargeTime={chargeTime1} />
      </div>
    )
  }
}



export default HomePage
