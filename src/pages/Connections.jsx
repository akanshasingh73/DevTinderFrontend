import { useEffect, useState } from 'react';

import { getConnections } from '../services/connectionRequest';

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const { data } = await getConnections();
        setConnections(data?.connections || data?.data || []);
      } catch (err) {
        console.error('Failed to fetch connections:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[60vh]'>
        <span className='loading loading-spinner loading-lg'></span>
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto px-4 py-10 mb-20'>
      <h1 className='text-2xl font-bold mb-6'>My Connections</h1>

      {connections.length === 0 ? (
        <div className='text-center text-base-content/50 mt-16'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-12 w-12 mx-auto mb-3 opacity-30'
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
          <p className='text-lg'>No connections yet</p>
          <p className='text-sm mt-1'>
            Start swiping on the feed to make connections!
          </p>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {connections.map((connection) => {
            const user = connection.userId || connection.user || connection;

            return (
              <div
                key={user._id}
                className='card bg-base-100 shadow-sm border border-base-200'
              >
                <div className='card-body flex-row items-center gap-4 p-4'>
                  <div className='avatar'>
                    <div className='w-14 h-14 rounded-full bg-base-200'>
                      {user.photo ? (
                        <img
                          src={user.photo}
                          alt={user.name}
                          className='object-cover'
                        />
                      ) : (
                        <div className='flex items-center justify-center w-full h-full text-base-content/30 text-xs'>
                          No photo
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className='flex-1 min-w-0'>
                    <h2 className='font-semibold truncate'>
                      {user.name || 'Unknown User'}
                    </h2>
                    {(user.age || user.gender) && (
                      <p className='text-sm text-base-content/60'>
                        {[user.age, user.gender].filter(Boolean).join(' · ')}
                      </p>
                    )}
                    {user.about && (
                      <p className='text-sm text-base-content/70 mt-1 line-clamp-2'>
                        {user.about}
                      </p>
                    )}
                    {user.skills?.length > 0 && (
                      <div className='flex flex-wrap gap-1 mt-2'>
                        {user.skills.slice(0, 4).map((skill, i) => (
                          <span
                            key={i}
                            className='badge badge-outline badge-xs'
                          >
                            {skill.trim()}
                          </span>
                        ))}
                        {user.skills.length > 4 && (
                          <span className='badge badge-outline badge-xs'>
                            +{user.skills.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Connected badge */}
                  <div className='shrink-0'>
                    <span className='badge badge-success badge-outline gap-1'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-3 w-3'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M5 13l4 4L19 7'
                        />
                      </svg>
                      Connected
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Connections;
