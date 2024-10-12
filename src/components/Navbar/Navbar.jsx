import React, { useState } from 'react'
import ProfileInfo from '../Cards/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';


const Navbar = ({ userInfo, onSearchNote ,handleClearSearch}) => {

  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  const onLogOut = () => {
    localStorage.clear();
    navigate('/login');
  }

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery('');
    handleClearSearch()
  };

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
      <h2 className='text-xl font-medium text-black py-2'>Notes</h2>

      {/* call search bar component */}
      <SearchBar
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)} // Sử dụng event để lấy giá trị của input
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      {/* call profileInfo component */}
      <ProfileInfo userInfo={userInfo} onLogOut={onLogOut} />
    </div>
  )
}

export default Navbar