import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    umpires,
    result,
    manOfTheMatch,
    date,
    venue,
    competingTeam,
    competingTeamLogo,
    firstInnings,
    secondInnings,
  } = latestMatchDetails
  return (
    <div className="lm-bg-container">
      <div className="lm-top-container">
        <div className="match-result-cont">
          <p className="opp-team">{competingTeam}</p>
          <p className="match-date">{date}</p>
          <p className="venue">{venue}</p>
          <p className="venue">{result}</p>
        </div>
        <img
          className="comp-team-logo"
          src={competingTeamLogo}
          alt={`latest match ${competingTeam}`}
        />
      </div>
      <hr />
      <div className="match-summary-container">
        <h1 className="match-sum-heading">First Innings</h1>
        <p className="match-sum-para">{firstInnings}</p>
        <h1 className="match-sum-heading">Second Innings</h1>
        <p className="match-sum-para">{secondInnings}</p>
        <h1 className="match-sum-heading">Man Of The Match</h1>
        <p className="match-sum-para">{manOfTheMatch}</p>
        <h1 className="match-sum-heading">Umpires</h1>
        <p className="match-sum-para">{umpires}</p>
      </div>
    </div>
  )
}

export default LatestMatch
