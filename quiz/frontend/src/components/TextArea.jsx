

const TextArea = ({ value, onChange, placeholder, name }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
    ></textarea>
  );
};

export default TextArea;
