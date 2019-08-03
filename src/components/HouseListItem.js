import React from 'react'
import '../styles/HouseListItem.scss'

export default function HouseListItem (props) {
  return (
    <div className="house-list-item" onClick={() => {props.selectHouse(props.house.id)}}>
      <p className="house-list-title">{props.house.name}</p>
    </div>
  )
}