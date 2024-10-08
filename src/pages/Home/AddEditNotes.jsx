import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/AxiosInstance';

const AddEditNotes = ({noteData, type, onClose, getAllNotes, showToastMessage}) => {

  const [title, setTitle] = useState(noteData?.title ||'');
  const [content, setContent] = useState(noteData?.content ||'');
  const [tags, setTags] = useState(noteData?.tags ||[]);

  const [error, setError] = useState(null);

  // Handle add notes
  const addNewNote = async() => {
    try {
      const response = await axiosInstance.post('/add-note',{title, content, tags});
      if(response.data && response.data.note){
        showToastMessage('Note added successfully')
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }
    }
  };

  const editNote = async() => {

    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put('/edit-note/' + noteId,{title, content, tags});
      if(response.data && response.data.note){
        showToastMessage('Note updated successfully')
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote =() => {
      if (!title){
          setError('Title is required');
          return;
      }

      if (!content){
          setError('Content is required');
          return;
      }
      
     setError('');

     if (type === 'edit') {
      editNote();
     }else{
      addNewNote();
     }
  };

  return (
    <div className='relative'>

      <button 
      className='w-10 h-10 flex rounded-full items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50'
      onClick={onClose}
      >
        <MdClose className='text-xl text-slate-400'/>
      </button>

      <div className='flex flex-col gap-2'>
        <label className='input-label'>Title</label>
        <input
          type="text"
          className='text-2xl text-slate-950 outline-none'
          placeholder="Go to gym at 5pm"
          value={title}
          onChange={({ target }) => setTitle(target.value)} />
      </div>

      <div className='flex flex-col gap-2 mt-4'>
        <label className='input-label'>Content</label>
        <textarea
          type="text"
          className='text-sm text-slate-950 outline-none bg-slate-50 p2 rounded'
          placeholder="content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)} />
           
      </div>

      <div className='mt-3'>
        <label className='input-label'>Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      
      {error && <div className='text-red-500 text-xs pt-4'>{error}</div>}

      <button onClick={handleAddNote} className='btn-primary font-medium mt-5 p-3 '>{type === 'edit' ? 'UPDATE' : 'ADD'}</button>

    </div>
  )
}

export default AddEditNotes