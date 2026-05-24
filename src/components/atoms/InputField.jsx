const InputField = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  title,
  hint,
  icon,
}) => {
  return (
    <>
      <label className='input validator'>
        {icon && (
          <svg
            className='h-[1em] opacity-50'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
          >
            {icon}
          </svg>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          title={title}
        />
      </label>
      {hint && <p className='validator-hint hidden'>{hint}</p>}
    </>
  );
};

export default InputField;
