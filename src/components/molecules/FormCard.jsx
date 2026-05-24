const FormCard = ({ title, children }) => (
  <div className='flex items-center justify-center'>
    <div className='card bg-sky-100 w-96 shadow-lg border border-base-300'>
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        {children}
      </div>
    </div>
  </div>
);

export default FormCard;
