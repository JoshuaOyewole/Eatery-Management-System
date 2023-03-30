import React from 'react'

type ButtonProps = {
  text:String |React.ReactNode,
  classname?:String,
  handleClick?:()=>void;
}


const Button = (props: ButtonProps) => {

  return (
    <button 
      className={`btn ${props.classname && props.classname}`}
      onClick={props.handleClick}>{props.text}</button>
  )
}

export default Button