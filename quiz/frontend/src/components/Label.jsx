import React from 'react';

const Label = ({ htmlFor, children, className, ...props }) => {
  return (
    <label htmlFor={htmlFor} className={className} {...props}>
      {children}
    </label>
  );
};

export default Label;