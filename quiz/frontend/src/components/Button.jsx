import React from 'react'

const Button = ({children,className,onClick,disable,style}) => {
  return (
    <button onClick={onClick} className={className} disabled={disable} style={style}>{children}</button>
  )
}

export default Button
