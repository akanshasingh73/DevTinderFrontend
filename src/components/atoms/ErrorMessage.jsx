const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return <p className='text-error text-sm text-center mt-1'>{message}</p>;
};

export default ErrorMessage;
