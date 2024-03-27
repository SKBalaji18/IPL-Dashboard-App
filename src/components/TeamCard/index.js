import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamItem} = props
  const {id, name, teamImgUrl} = teamItem
  return (
    <Link className="team-card-link" to={`/team-matches/${id}`}>
      <li className="team-card-container">
        <img className="team-home-logo" src={teamImgUrl} alt={name} />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
