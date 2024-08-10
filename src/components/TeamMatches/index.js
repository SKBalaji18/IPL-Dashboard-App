import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import PieChart from '../PieChart'

import './index.css'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    fetchedDetailData: {},
  }

  componentDidMount() {
    this.getTeamDetails()
  }

  getTeamDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)

    const data = await response.json()

    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        id: data.latest_match_details.id,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      },
      recentMatches: data.recent_matches.map(eachItem => ({
        umpires: eachItem.umpires,
        result: eachItem.result,
        manOfTheMatch: eachItem.man_of_the_match,
        id: eachItem.id,
        date: eachItem.date,
        venue: eachItem.venue,
        competingTeam: eachItem.competing_team,
        competingTeamLogo: eachItem.competing_team_logo,
        firstInnings: eachItem.first_innings,
        secondInnings: eachItem.second_innings,
        matchStatus: eachItem.match_status,
      })),
    }

    console.log(data)

    this.setState({isLoading: false, fetchedDetailData: updatedData})
  }

  getTeamResults = res => {
    const {fetchedDetailData} = this.state
    const {latestMatchDetails, recentMatches} = fetchedDetailData

    const latestResult = latestMatchDetails.matchStatus === res ? 1 : 0
    const result =
      recentMatches.filter(each => each.matchStatus === res).length +
      latestResult
    return result
  }

  pieData = () => [
    {name: 'Won', value: this.getTeamResults('Won')},
    {name: 'Lost', value: this.getTeamResults('Lost')},
    {name: 'Drawn', value: this.getTeamResults('Drawn')},
  ]

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  render() {
    const {isLoading, fetchedDetailData} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = fetchedDetailData
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <div className={`team-match-bg-container ${id}`}>
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div className="tm-img-container">
            <img className="banner-img" src={teamBannerUrl} alt="team banner" />
            <p className="tm-heading">Team Statics</p>
            <PieChart data={this.pieData()} />
            <p className="tm-heading"> Latest Matches</p>
            <LatestMatch latestMatchDetails={latestMatchDetails} />
            <ul className="match-card-container">
              {recentMatches.map(eachItem => (
                <MatchCard key={eachItem.id} eachMatch={eachItem} />
              ))}
            </ul>
            <Link to="/" className="btn-link">
              <button type="button" className="back-btn">
                Back
              </button>
            </Link>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
