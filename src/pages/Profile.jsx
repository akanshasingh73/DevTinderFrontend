import { useDispatch, useSelector } from 'react-redux';

import ErrorMessage from '../components/atoms/ErrorMessage';
import FormButton from '../components/atoms/FormButton';
import FormCard from '../components/molecules/FormCard';
import InputField from '../components/atoms/InputField';
import UserCard from '../components/atoms/UserCard';
import { addUser } from '../utils/userSlice';
import { updateProfile } from '../services/userService';
import { useState } from 'react';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.data);

  const [name, setName] = useState(user?.name || '');
  const [age, setAge] = useState(user?.age || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [photo, setPhoto] = useState(user?.photo || '');
  const [about, setAbout] = useState(user?.about || '');
  const [skills, setSkills] = useState(user?.skills?.join(', ') || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const saveHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await updateProfile({
        name,
        age,
        gender,
        photo,
        about,
        skills: skills
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      });
      dispatch(addUser(data.user));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to save. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col lg:flex-row items-start justify-center gap-8 my-10 px-4'>
      <FormCard title='Edit Profile'>
        <InputField
          type='text'
          placeholder='Your name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          type='number'
          placeholder='Your age'
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <InputField
          type='text'
          placeholder='Your gender'
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <InputField
          type='url'
          placeholder='Photo URL'
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <InputField
          type='text'
          placeholder='Skills (comma separated)'
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <InputField
          type='text'
          placeholder='Tell us about yourself'
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        <ErrorMessage message={error} />

        {saved && (
          <p className='text-success text-sm text-center mt-1'>
            Profile saved successfully!
          </p>
        )}

        <div className='pt-4 flex items-center justify-center'>
          <FormButton
            loading={loading}
            label='Save Profile'
            onClick={saveHandler}
          />
        </div>
      </FormCard>

      <div className='flex flex-col items-center gap-2'>
        <UserCard
          name={name}
          age={age}
          gender={gender}
          photo={photo}
          about={about}
          skills={skills
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)}
        />
      </div>
    </div>
  );
};

export default Profile;
