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
          </div>
        </div>
      )
  }
}

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {ships: 'no ships yet'}
  }

  componentDidMount() {
    const _this = this
    setInterval(() => {
      _this.updateShipState()
    }, 5000)
  }

  updateShipState() {
    let _this = this
    fetch('http://localhost:9000').then(res => {
      return res.json()
    }).then(json => {

      const withinViewport = (lat, lon) => {
        return lat > boundingBox[0][0] &&
          lat < boundingBox[1][0] &&
          lon > boundingBox[0][1] &&
          lon < boundingBox[1][1]
      }

      const normalize = (num) => {
        const min = boundingBox[0][0]
        const max = boundingBox[1][0]
        return (num - min) / (max - min)
      }

      const generateResult = (data) => {
        if (data.lat && data.lon) {
          if (withinViewport(data.lat, data.lon)) {
            boatCache[data.mmsi] = data
            boatCache[data.mmsi].viewX = normalize(data.lat)
          } else {
            delete boatCache[data.mmsi]
          }
        }
        return boatCache
      }

      const shipsJSON = JSON.parse(json)
      const ships = generateResult(shipsJSON)
      console.log(ships)
      _this.setState({ships})

    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
        <CarSpot price="$10" left="100" top="100" isFree={true} />
        <CarSpot price="$8" left="600" top="100" isFree={false} />
      </div>
    )
  }
}



export default HomePage
