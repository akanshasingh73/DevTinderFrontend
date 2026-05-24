const FormButton = ({ loading, label, onClick, className = '' }) => (
  <button
    className={`btn btn-primary w-30 py-6 ${className}`}
    onClick={onClick}
    disabled={loading}
  >
    {loading ? <span className='opacity-70'>{label}</span> : label}
  </button>
);

export default FormButton;
