import React from 'react'
import Button from './Button'
import '../styles/HouseSingle.scss'

export default function HouseSingle(props) {
  return (
    <div className="house-single">
      <div className="house">
        <img
          className="house-img"
          src={props.houseData.image}
          alt="Requested house"
          onClick={() => { props.incrementClicker() }}
        />
        <h2>{props.houseData.name}</h2>
        <div className="house-counter">Clicks: {props.clicker}</div>
        <Button action={props.resetClicker} text="Reset counter"/>
      </div>
    </div>
  )
}