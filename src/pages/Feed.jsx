import { useEffect, useState } from 'react';

import UserCard from '../components/atoms/UserCard';
import { getUserFeed } from '../services/userService';
import { sendRequest } from '../services/connectionRequest';

const Feed = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null); // 'left' | 'right' | null
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const { data } = await getUserFeed();
        setUsers(data?.users || []);
      } catch (err) {
        console.error('Error fetching feed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  const handleAction = async (status) => {
    if (actionLoading) return;

    const currentUser = users[currentIndex];
    if (!currentUser) return;

    // 1. trigger the animation direction
    setDirection(status === 'interested' ? 'right' : 'left');
    setActionLoading(true);

    try {
      // 2. fire API in parallel with animation
      await sendRequest(status, currentUser._id);
    } catch (err) {
      console.error(`Failed to send ${status}:`, err);
      // on error reset animation and let user retry
      setDirection(null);
      setActionLoading(false);
      return;
    }

    // 3. after animation completes, move to next card
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setDirection(null);
      setActionLoading(false);
    }, 400);
  };

  // ── Loading state ──
  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[70vh]'>
        <span className='loading loading-spinner loading-lg'></span>
      </div>
    );
  }

  // ── Empty / exhausted state ──
  if (!users.length || currentIndex >= users.length) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[70vh] text-base-content/50'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-16 w-16 mb-4 opacity-25'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.5}
            d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'
          />
        </svg>
        <p className='text-xl font-semibold'>You&apos;re all caught up!</p>
        <p className='text-sm mt-1'>No more developers to show right now.</p>
      </div>
    );
  }

  const currentUser = users[currentIndex];

  // inline styles that drive the animation
  const cardStyle = {
    transition: 'opacity 400ms ease, transform 400ms ease',
    opacity: direction ? 0 : 1,
    transform:
      direction === 'right'
        ? 'translateX(120px) rotate(8deg)'
        : direction === 'left'
          ? 'translateX(-120px) rotate(-8deg)'
          : 'translateX(0) rotate(0deg)',
  };

  return (
    <div className='flex flex-col my-18 items-center justify-center min-h-[70vh] gap-6 mb-20'>
      {/* progress indicator */}
    
      {/* animated card wrapper */}
      <div style={cardStyle}>
        <UserCard
          name={currentUser.name}
          photo={currentUser.photo}
          about={currentUser.about}
          skills={currentUser.skills}
        />
      </div>

      {/* action buttons */}
      <div className='flex gap-6'>
        <button
          className='btn btn-error btn-lg rounded-full w-16 h-16 text-2xl shadow-md'
          disabled={actionLoading}
          onClick={() => handleAction('ignored')}
          title='Ignore'
        >
          👎
        </button>
        <button
          className='btn btn-success btn-lg rounded-full w-16 h-16 text-2xl shadow-md'
          disabled={actionLoading}
          onClick={() => handleAction('interested')}
          title='Interested'
        >
          👍
        </button>
      </div>

      {/* swipe hints */}
      <div className='flex gap-16 text-xs text-base-content/30 select-none'>
        <span>← Ignore</span>
        <span>Interested →</span>
      </div>
    </div>
  );
};

export default Feed;
