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
  // console.log(options);
  
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
        <option value="" disabled className='text-opacity-50'>
          {placeholder}
        </option>
      )}
      {options?.length > 0 ? (
        options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))
      ) : (
        <option value="" disabled>No options available</option>
      )}
    </select>
  );
});

Select.displayName = 'Select';

export default Select;
