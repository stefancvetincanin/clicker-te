import React from 'react'
import '../styles/Button.scss'

export default function Button (props) {
  return (
    <button className="house-app-button" onClick={() => { props.action() }}>{props.text}</button>
  )
}