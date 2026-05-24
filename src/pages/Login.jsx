import { EmailIcon, PasswordIcon } from '../utils/icons';

import ErrorMessage from '../components/atoms/ErrorMessage';
import FormButton from '../components/atoms/FormButton';
import FormCard from '../components/molecules/FormCard';
import InputField from '../components/atoms/InputField';
import { addUser } from '../utils/userSlice';
import { loggedIn } from '../services/authService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('Kanupriya@example.com');
  const [password, setPassword] = useState('Kanupriya@111');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await loggedIn({ email, password });
      dispatch(addUser(data.user));
      navigate('/feed');
    } catch (err) {
      setError(
        err?.response?.data?.message || 'Login failed. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='my-20'>
      <FormCard title='Login'>
        <InputField
          type='email'
          placeholder='mail@site.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          hint='Enter valid email address'
          icon={EmailIcon}
        />
        <InputField
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          title='Must be more than 8 characters, including number, lowercase letter, uppercase letter'
          hint={
            <>
              Must be more than 8 characters, including
              <br />
              At least one number
              <br />
              At least one lowercase letter
              <br />
              At least one uppercase letter
            </>
          }
          icon={PasswordIcon}
        />
        <ErrorMessage message={error} />
        <div className='flex justify-center pt-4'>
          <FormButton loading={loading} label='Login' onClick={loginHandler} />
        </div>
      </FormCard>
    </div>
  );
};

export default Login;
