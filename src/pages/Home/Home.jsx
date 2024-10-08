import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/AxiosInstance'
import moment from 'moment'

const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  })

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShown: true,
      type: 'edit',
      data: noteDetails,
    })
  };

  //Get user info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get('/get-user');
      
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  //get all note
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get('/get-all-notes');
      
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log('djt me may loi roi -- get all notes',error);
      
    }
  };

  useEffect(()=>{
    getUserInfo();
    getAllNotes();
    // eslint-disable-next-line
    return () => {
      // cleanup
    }
  },[])

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className='container mx-auto'>

        {/* notes cards */}
        <div className='grid grid-cols-3 gap-4 mt-8'>
        {allNotes.map((item, index)=>(
          <NoteCard
          key={item._id}
          date={item.createOn}
          title={item.title}
          content={item.content}
          tags={item.tags}
          isPinned={item.isPinned}
          onEdit={() => handleEdit(item)}
          onDelete={() => { }}
          onPinNote={() => { }}
        />
        ))}
        </div>

        {/* button add */}
        <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'
          onClick={() => {
            setOpenAddEditModal({
              isShown: true,
              type: 'add',
              data: null,
            })
          }}>
          <MdAdd className='text-[32px] text-white' />
        </button>
      </div>

      {/* modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.2)'
          }
        }}
        contentLabel='Add or Edit Note'
        className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll'
      >
        <AddEditNotes
          type={openAddEditModal.type}
          data={openAddEditModal.data}
          onclose={() => {
            setOpenAddEditModal({
              isShown: false,
              type: 'add',
              data: null,
            })
          }} 
          getAllNotes={getAllNotes}
        />
      </Modal>

    </>
  )
}

export default Home