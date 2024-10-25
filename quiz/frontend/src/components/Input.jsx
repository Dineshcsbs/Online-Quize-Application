import React from 'react';

const Input = ({
  type,
  value,
  onChange,
  placeholder,
  name,
  disabled,
  className,
  maxLength,
  minLength,
  pattern,
  required,
  autoFocus,
  autoComplete,
  register,
  onClick,
  style
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange} 
      onClick={onClick}   
      placeholder={placeholder}
      name={name}
      disabled={disabled}
      className={className}
      maxLength={maxLength}
      minLength={minLength}
      pattern={pattern}
      required={required}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      style={style}
      {...register} 
    />
  );
};

export default Input;