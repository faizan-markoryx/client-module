import { Button, Modal } from 'antd'
import { useState } from 'react'
import { MdErrorOutline } from 'react-icons/md'
import { deleteNote } from '../../services/contactAddNote'
import { useDispatch } from 'react-redux'
import { setContactNoteRefresh } from '../../redux/contactSlice'
import { AiOutlineDelete } from 'react-icons/ai'
import "../../styles/popUpStyle/LogOutPopup.css"

const DeleteNotePopup = ({ deleteNoteData, setEditAndDeleteAPIVal }: any) => {

    const [deleteConfirmation, setDeleteConfirmation] = useState(false)

    const dispatch = useDispatch()

    const noteDeleted = (id: any) => {
        deleteNote(id?.id).then(() => {
            dispatch(setContactNoteRefresh())
            setEditAndDeleteAPIVal(true)
        })
    }

    return (
        <>

            {
                <button className="text-2xl" onClick={() => setDeleteConfirmation(true)}><AiOutlineDelete /></button>
            }
            <div>
                <Modal centered={true} width={420} className='logout-modal' footer={null} open={deleteConfirmation} onOk={() => setDeleteConfirmation(false)} onCancel={() => setDeleteConfirmation(false)}>
                    <div className='flex items-center gap-2'>
                        <MdErrorOutline className='text-2xl text-red-500' />
                        <p className='font-medium text-base'>Are you sure you want delete this note?</p>
                    </div>
                    <div className=' flex gap-5'>
                        <Button onClick={() => setDeleteConfirmation(false)}>No</Button>

                        <Button className='logoutYesBut !bg-[#0E4D92] text-white hover:!text-white'
                            onClick={() => { noteDeleted(deleteNoteData), setDeleteConfirmation(false) }}>Yes</Button>
                    </div>
                </Modal>

            </div>
        </>
    )
}

export default DeleteNotePopup