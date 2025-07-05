
import '../../styles/client/allClientDeleteNotePopUp.css'
import { AiOutlineDelete } from 'react-icons/ai'
import { useState } from 'react';
import { Modal } from 'antd';
import { MdErrorOutline } from 'react-icons/md';
import { deleteClientNotesApi } from '../../services/clientServices';
import { useDispatch } from 'react-redux';
import { setClientNoteRefresh, setClientRefresh } from '../../redux/clientSlice';

const AllClientDeleteNotePopUp = ({ deleteId }: any) => {

    const [isClientDeleteOpenModal, setIsClientDeleteOpenModal] = useState(false);
    const dispatch = useDispatch()

    const deletClientNotes = () => {
        deleteClientNotesApi(deleteId?.id).then((res: any) => {
            if (res.success) {
                setIsClientDeleteOpenModal(false)
                dispatch(setClientNoteRefresh());
                dispatch(setClientRefresh());
            }
        })
    }

    return (
        <>
            <div>
                <AiOutlineDelete
                    className='cursor-pointer'
                    onClick={() => {
                        setIsClientDeleteOpenModal(true);
                    }
                    } />
            </div>

            <Modal
                wrapClassName='delete-note-popup-modal'
                open={isClientDeleteOpenModal}
                width={420}
                onOk={() => setIsClientDeleteOpenModal(false)}
                onCancel={() => setIsClientDeleteOpenModal(false)}
                footer={null}
            >
                <div className='client-all-delete-details'>
                    <div className='client-delete-first-division'>
                        <MdErrorOutline className='delete-error-icon' />
                        <p className='font-medium text-base'>Are you sure you want to delete this note?</p>
                    </div>
                    <div className='flex gap-4 justify-center mt-[3rem]'>
                        <button
                            className='w-[4rem] h-[2rem] bg-white border border-gray rounded-md'
                            onClick={() => setIsClientDeleteOpenModal(false)}>No</button>
                        <button
                            className='w-[3rem] h-[2rem] bg-primary text-white rounded-md'
                            onClick={() => { deletClientNotes(); setIsClientDeleteOpenModal(false) }}>Yes</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default AllClientDeleteNotePopUp;
