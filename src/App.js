import React, { Component } from 'react';
import HouseListItem from './components/HouseListItem'
import HouseSingle from './components/HouseSingle'
import './App.scss';
import Loader from './images/loader.gif'

class App extends Component {
  state = {
    waitingForApi: true,
    houseList: [],
    houseSelected: 1,
    apiError: false,
    apiErrorMessage: ''
  }

  componentDidMount = () => {
    this.getHouseList()
  }

  // Function that obtains the house list from the provided API, and stores it in the app state.
  getHouseList = () => {
    this.setState({
      waitingForApi: true
    })
    const apiUrl = 'http://te-testapp.azurewebsites.net/api/House/'
    const proxyUrl = 'https://proxy-requests.herokuapp.com/'
    // Using a proxy for this API call because the response header doesnt allow cross origin resource sharing
    fetch(`${proxyUrl}${apiUrl}`)
      .then(results => results.json())
      .then(results => {
        this.setState({
          houseList: results,
          waitingForApi: false
        })
      })
      .catch(error => {
        this.setState({
          apiError: true,
          apiErrorMessage: String(error)
        })
      })
  }

  // When the user clicks on a house name in the house list, it is set as the selected house by this function
  selectHouse = (houseId) => {
    this.setState({
      houseSelected: houseId
    })
  }

  // Increments the counter for the house selected by the houseId
  incrementClicker = (houseId) => {
    this.setState(prevState => {
      let newHouseList = prevState.houseList.map(element => {
        // If the element id matches the parameter house id, the count property gets incremented, otherwise the map function returns the original element
        if(element.id === houseId) {
          element.count++
          return element
        }
        return element
      })
      return {
        houseList: newHouseList
      }
    })
  }

  render () {
    let displayHouseList = this.state.houseList.map((house, index) => {
      return (
        <HouseListItem house={house} key={index} selectHouse={this.selectHouse}/>
      )
    })

    // Until the API call returns data, the app displays a loader
    if(this.state.waitingForApi) {
      return (
        <main>
          <div className="house-app">
            <img className="house-app-loader" src={Loader} alt="Waiting for server response" width="100" height="100"/>
          </div>
          {/* Only shows the error message if the API call catches an error */}
          <p className="house-app-error" style={{display: !this.state.apiError && "none"}}>
            Cannot connect to remote resource. {this.state.apiErrorMessage}
          </p>
        </main>
      )
    }

    return (
      <main>
        <div className="house-app">
          <div className="house-list">
            {displayHouseList}
          </div>

          <HouseSingle houseData={this.state.houseList[this.state.houseSelected - 1]} incrementClicker={this.incrementClicker} />
        </div>
      </main>
    )
  }
}

export default App;