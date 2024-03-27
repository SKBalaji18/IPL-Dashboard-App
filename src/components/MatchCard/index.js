import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import LatestMatch from '../LatestMatch'
import './index.css'

const MatchCard = props => {
  const {eachMatch} = props
  const {result, competingTeam, competingTeamLogo, matchStatus} = eachMatch
  const resultClass = matchStatus === 'Won' ? 'win' : 'lose'

  const overlayStyles = {
    backgroundColor: '(#1e293b, 0.5)',
    border: '1px solid #475569',
    margin: '0px',
  }
  return (
    <Popup
      modal
      trigger={
        <li className="match-card">
          <img
            className="match-card-logo"
            src={competingTeamLogo}
            alt={`competing team ${competingTeam}`}
          />
          <p className="recent-match-opp">{competingTeam}</p>
          <p className="recent-match-result">{result}</p>
          <p className={`recent-match-sts ${resultClass}`}>{matchStatus}</p>
        </li>
      }
      overlayStyle={overlayStyles}
    >
      <LatestMatch latestMatchDetails={eachMatch} />
    </Popup>
  )
}

export default MatchCard
