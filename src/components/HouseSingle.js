import React from 'react'
import '../styles/HouseSingle.scss'

export default function HouseSingle(props) {
  return (
    <div className="house-single">
      <div className="house">
        <img
          className="house-img"
          src={props.houseData.image}
          alt="Requested house"
          onClick={() => { props.incrementClicker(props.houseData.id) }}
        />
        <h2>{props.houseData.name}</h2>
        <div className="house-counter">Clicks: {props.houseData.count}</div>
      </div>
    </div>
  )
}