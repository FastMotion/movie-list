import React from 'react'

const MovieTabs = (props) => {
  const {updateSortBy,sort_by} = props

  const handleClick = value => {
    return () => {
    updateSortBy(value)}
  }

  const getClassLink = value => {
    return `nav-link ${sort_by === value ? 'active' : ''}`
  }

  return(
<ul className="tabs nav nav-pills">
  <li className="nav-item">
    <div
      className={getClassLink('popularity.desc')}
      onClick={handleClick('popularity.desc')}
    >
      Popularity desc
    </div>
  </li>
  <li className="nav-item">
    <div
      className={getClassLink('revenue.desc')}
      onClick={handleClick('revenue.desc')}
      >
      Revenue desc
    </div>
  </li>
  <li className="nav-item">
    <div
      className={getClassLink('vote_count.desc')}
      onClick={handleClick('vote_count.desc')}
      >
      vote_count.desc
    </div>
  </li>
</ul>
)
}

export default MovieTabs