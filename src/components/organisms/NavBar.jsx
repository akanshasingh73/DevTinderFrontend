import { Link, useNavigate } from 'react-router-dom';

import { loggedOut } from '../../services/authService';
import { removeUser } from '../../utils/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector((store) => store.user.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await loggedOut();
    dispatch(removeUser());
    navigate('/login');
  };

  return (
    <div className='navbar bg-base-100 shadow-sm'>
      <div className='flex-1'>
        <Link to='/feed' className='btn btn-ghost text-xl'>
          Dev Tinder
        </Link>
      </div>
      {user && (
        <div className='flex gap-2 items-center'>
          {/* Requests Nav Link */}
          <Link to='/request-review' className='btn btn-ghost btn-sm gap-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
              />
            </svg>
            Requests
          </Link>

          {/* Connections Nav Link */}
          <Link to='/connections' className='btn btn-ghost btn-sm gap-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
            Connections
          </Link>

          <p>Welcome! {user.name}</p>
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div className='w-10 rounded-full '>
                <img alt='User avatar' src={user.photo} />
              </div>
            </div>
            <ul
              tabIndex='-1'
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
            >
              <li>
                <Link to='/profile' className='justify-between'>
                  Profile
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
