import React from "react"

export default function Die(props) {

  const style1 = {
    backgroundColor: props.isheld?'lightgreen':'white'
  }

    return (
        <div className="die-face" style={style1} onClick={()=>{props.holddie(props.id)}}>
            <h2 className="die-num" >{props.value}</h2>
        </div>
    )
}