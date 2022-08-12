import React from 'react'

const TimerLengthControl = (props) => {
  return (
    <div className="length-control">
        <div id={props.titleID}>{props.title}</div>
        <button
          className="btn-level"
          id={props.minID}
          onClick={props.onClick}
          value="-"
        >
       DEC
        </button>
        <div className="btn-level" id={props.lengthID}>
          {props.length}
        </div>
        <button
          className="btn-level"
          id={props.addID}
          onClick={props.onClick}
          value="+"
        >INC
        </button>
      </div>
  )
}

export default TimerLengthControl