import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TeamCard from '../TeamCard'
import './index.css'

const teamsApiUrl = 'https://apis.ccbp.in/ipl'

class Home extends Component {
  state = {
    isLoading: true,
    fetchedData: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const response = await fetch(teamsApiUrl)
    const data = await response.json()

    const updatedData = data.teams.map(eachItem => ({
      name: eachItem.name,
      id: eachItem.id,
      teamImgUrl: eachItem.team_image_url,
    }))

    this.setState({isLoading: false, fetchedData: updatedData})
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  render() {
    const {isLoading, fetchedData} = this.state
    return (
      <div className="home-bg-container">
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div className="home-details-container">
            <div className="home-header-container">
              <img
                className="ipl-logo"
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                alt="ipl logo"
              />
              <h1 className="home-page-title">IPL Dashboard</h1>
            </div>
            <ul className="team-list-container">
              {fetchedData.map(eachItem => (
                <TeamCard key={eachItem.id} teamItem={eachItem} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default Home
