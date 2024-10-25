

const TextArea = ({ value, onChange, placeholder, name ,register,className,style}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      className={className}
      {...register}
      style={style}
    ></textarea>
  );
};

export default TextArea;
