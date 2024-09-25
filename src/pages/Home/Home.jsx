import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'

const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  })

  return (
    <>
      <Navbar />

      <div className='container mx-auto'>

        {/* notes cards */}
        <div className='grid grid-cols-3 gap-4 mt-8'>
          <NoteCard
            date={'22/2/2222'}
            title={'cuộc gọi nhỡ lúc giữa đêm'}
            content={'cuoc goi nho'}
            tags={'cuoc goi'}
            isPinned={true}
            onEdit={() => { }}
            onDelete={() => { }}
            onPinNote={() => { }}
          />
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
        onclose={()=>{
          setOpenAddEditModal({
            isShown: false,
            type: 'add',
            data: null,
          })
        }}
        />
      </Modal>

    </>
  )
}

export default Home