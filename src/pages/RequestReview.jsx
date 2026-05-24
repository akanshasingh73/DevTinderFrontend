import {
  getConnectionRequests,
  reviewRequest,
} from '../services/connectionRequest';
import { useEffect, useState } from 'react';

const RequestReview = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const [exitingIds, setExitingIds] = useState(new Set());

  const fetchRequests = async () => {
    try {
      const { data } = await getConnectionRequests();
      setRequests(data?.requests || data?.data || []);
    } catch (err) {
      console.error('Failed to fetch requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRequest = async (requestId, status) => {
    // 1. start button spinner
    setActionLoading((prev) => ({ ...prev, [requestId]: status }));

    try {
      // 2. fire API and animate in parallel
      await reviewRequest(requestId, status);

      // 3. mark card as exiting — triggers CSS transition
      setExitingIds((prev) => new Set(prev).add(requestId));

      // 4. after animation completes, remove from list
      setTimeout(() => {
        setRequests((prev) => prev.filter((r) => r.requestId !== requestId));
        setExitingIds((prev) => {
          const next = new Set(prev);
          next.delete(requestId);
          return next;
        });
      }, 400); // match this to the CSS transition duration below
    } catch (err) {
      console.error(`Failed to ${status} request:`, err);
      // on error — clear spinner, card stays (nothing to undo)
      setActionLoading((prev) => ({ ...prev, [requestId]: null }));
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-[60vh]'>
        <span className='loading loading-spinner loading-lg'></span>
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto px-4 py-10 mb-20'>
      <h1 className='text-2xl text-center font-bold mb-6'>
        Connection Requests
      </h1>

      {requests.length === 0 ? (
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
              d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
            />
          </svg>
          <p className='text-lg'>No pending requests</p>
          <p className='text-sm mt-1'>
            When someone sends you a request, it will appear here.
          </p>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {requests.map((request) => {
            const sender = request.fromUserId || request.sender || request;
            const reqId = request.requestId;
            const isActing = actionLoading[reqId];
            const isExiting = exitingIds.has(reqId);

            return (
              <div
                key={reqId}
                style={{
                  transition:
                    'opacity 400ms ease, transform 400ms ease, max-height 400ms ease',
                  opacity: isExiting ? 0 : 1,
                  transform: isExiting ? 'translateX(60px)' : 'translateX(0)',
                  maxHeight: isExiting ? '0' : '200px',
                  overflow: 'hidden',
                }}
                className='card bg-base-100 shadow-sm border border-base-200'
              >
                <div className='card-body flex-row items-center gap-4 p-4'>
                  {/* Avatar */}
                  <div className='avatar'>
                    <div className='w-14 h-14 rounded-full bg-base-200'>
                      {sender.photo ? (
                        <img
                          src={sender.photo}
                          alt={sender.name}
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
                      {sender.name || 'Unknown User'}
                    </h2>
                    {(sender.age || sender.gender) && (
                      <p className='text-sm text-base-content/60'>
                        {[sender.age, sender.gender]
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                    )}
                    {sender.about && (
                      <p className='text-sm text-base-content/70 mt-1 line-clamp-1'>
                        {sender.about}
                      </p>
                    )}
                    {sender.skills?.length > 0 && (
                      <div className='flex flex-wrap gap-1 mt-1'>
                        {sender.skills.slice(0, 3).map((skill, i) => (
                          <span
                            key={i}
                            className='badge badge-outline badge-xs'
                          >
                            {skill.trim()}
                          </span>
                        ))}
                        {sender.skills.length > 3 && (
                          <span className='badge badge-outline badge-xs'>
                            +{sender.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className='flex flex-col gap-2 shrink-0'>
                    <button
                      className='btn btn-primary btn-sm'
                      disabled={!!isActing}
                      onClick={() => handleRequest(reqId, 'accepted')}
                    >
                      {isActing === 'accepted' ? (
                        <span className='loading loading-spinner loading-xs'></span>
                      ) : (
                        '✓ Accept'
                      )}
                    </button>
                    <button
                      className='btn btn-outline btn-error btn-sm'
                      disabled={!!isActing}
                      onClick={() => handleRequest(reqId, 'rejected')}
                    >
                      {isActing === 'rejected' ? (
                        <span className='loading loading-spinner loading-xs'></span>
                      ) : (
                        '✕ Reject'
                      )}
                    </button>
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

export default RequestReview;
