import React, { Component } from 'react';
import HouseListItem from './components/HouseListItem'
import HouseSingle from './components/HouseSingle'
import './App.scss';
import Loader from './images/loader.gif'

class App extends Component {
  state = {
    waitingForApi: true,
    apiUrl: 'http://te-testapp.azurewebsites.net/api/House/',
    proxyUrl: 'https://proxy-requests.herokuapp.com/',
    houseList: [],
    houseSelected: 1,
    clicker: 0
  }

  componentDidMount = () => {
    this.getHouseList()
  }

  getHouseList = () => {
    this.setState({
      waitingForApi: true
    })
    fetch(`${this.state.proxyUrl}${this.state.apiUrl}`)
      .then(results => results.json())
      .then(results => {
        this.setState({
          houseList: results,
          waitingForApi: false
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  selectHouse = (houseId) => {
    this.setState({
      houseSelected: houseId
    })
  }

  incrementClicker = () => {
    this.setState(prevState => {
      return {
        clicker: prevState.clicker + 1
      }
    })
  }

  resetClicker = () => {
    this.setState({
      clicker: 0
    })
  }

  render () {
    let displayHouseList = []
    displayHouseList = this.state.houseList.map((house, i) => {
      return (
        <HouseListItem house={house} key={i} selectHouse={this.selectHouse}/>
      )
    })

    if(this.state.waitingForApi) {
      return (
        <main className="house-app">
          <img className="house-app-loader" src={Loader} alt="Waiting for server response" width="100"/>
        </main>
      )
    }

    return (
      <main className="house-app">
        <div className="house-list">
          {displayHouseList}
        </div>

        <HouseSingle houseData={this.state.houseList[this.state.houseSelected - 1]} clicker={this.state.clicker} incrementClicker={this.incrementClicker} resetClicker={this.resetClicker}/>
      </main>
    )
  }
}

export default App;
