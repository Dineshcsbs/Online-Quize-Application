import React from 'react';

const Select = React.forwardRef(({
  options,
  value, 
  onChange,
  name,
  placeholder,
  disabled,
  className,
}, ref) => {
  return (
    <select
      ref={ref} 
      value={value} 
      onChange={onChange}
      name={name}
      disabled={disabled}
      className={className}
    >
      {placeholder && (
        <option value="" disabled className='bg-opacity-50'>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
});

Select.displayName = 'Select';

export default Select;
