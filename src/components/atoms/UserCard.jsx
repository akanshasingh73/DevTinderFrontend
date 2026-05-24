const UserCard = ({ name, age, gender, photo, about, skills }) => {
  return (
    <div className='card bg-base-100 w-96 shadow-sm'>
      <figure className='h-72 bg-base-200'>
        {photo ? (
          <img src={photo} alt={name} className='w-full h-full object-cover' />
        ) : (
          <div className='flex items-center justify-center w-full h-full text-base-content/30 text-sm'>
            No photo yet
          </div>
        )}
      </figure>

      <div className='card-body'>
        <h2 className='card-title'>
          {name || 'Your Name'}
          {age && (
            <span className='font-normal text-base-content/60'>, {age}</span>
          )}
        </h2>

        {gender && (
          <p className='text-sm text-base-content/60 capitalize'>{gender}</p>
        )}

        <p>{about || 'No bio yet'}</p>

        {skills?.length > 0 && (
          <div className='flex flex-wrap gap-1 mt-1'>
            {skills.map((skill, i) => (
              <span key={i} className='badge badge-outline badge-sm'>
                {skill.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
