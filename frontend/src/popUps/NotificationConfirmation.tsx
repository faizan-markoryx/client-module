import { Button, Modal } from 'antd'
import { useState } from 'react'
import { HiOutlineMailOpen } from 'react-icons/hi';
import { RiErrorWarningFill } from 'react-icons/ri';
import { readNoteAPI } from '../services/contactAddNote';
import { useDispatch } from 'react-redux';
import { setContactNoteRefresh } from '../redux/contactSlice';


const NotificationConfirmation = ({ ele }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch()

  const showModal = () => {
    setIsModalOpen(true);
  };

  const readNoteFun = () => {
    readNoteAPI({
      contactNoteId: ele?.id,
      isDone: 1
    }).then(() => {
      dispatch(setContactNoteRefresh())
    })
  }
  return (
    <div>
      <button onClick={showModal}>
        <HiOutlineMailOpen className='text-xl cursor-pointer' />
      </button>
      <Modal style={{ height: "250px" }} width={450} closable={false} open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)} footer={null}>
        <div className='flex items-center gap-2'>
          <span><RiErrorWarningFill className='text-2xl text-orange-400' /></span>
          <p className='text-lg font-semibold'>Mark this note as read?</p>
        </div>
        <div className='flex justify-end gap-4 pt-5'>
          <Button onClick={() => { setIsModalOpen(false); readNoteFun() }} className='bg-primary text-white hover:!text-white'>Yes</Button>
          <Button onClick={() => setIsModalOpen(false)}>No</Button>
        </div>
      </Modal>
    </div>
  )
}

export default NotificationConfirmation