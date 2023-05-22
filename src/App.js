import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TravelGuideItem from './components/TravelGuideItem'

import './App.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

// Replace your code here
class App extends Component {
  state = {travelGuideList: {}, apiStatus: apiConstants.initial}

  componentDidMount() {
    this.getTravelGuide()
  }

  getTravelGuide = async () => {
    this.setState({apiStatus: apiConstants.inProgress})

    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const fetchData = await response.json()
      const travelGuide = fetchData.packages.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.image_url,
        description: eachItem.description,
      }))

      this.setState({
        travelGuideList: travelGuide,
        apiStatus: apiConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {travelGuideList} = this.state
    return (
      <ul className="travel-guide-list">
        {travelGuideList.map(eachItem => (
          <TravelGuideItem key={eachItem.id} travelItem={eachItem} />
        ))}
      </ul>
    )
  }

  finalRender = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <h1 className="heading">Travel Guide</h1>
        {this.finalRender()}
      </div>
    )
  }
}

export default App
