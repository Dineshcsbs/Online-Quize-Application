import React from 'react'

const Button = ({children,className,onClick,disable}) => {
  return (
    <button onClick={onClick} className={className} disabled={disable}>{children}</button>
  )
}

export default Button
