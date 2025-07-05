import { Button, Modal, Select } from 'antd';
import { useState } from 'react';
import { IoIosArrowDropdown } from 'react-icons/io';
import "../../src/styles/popUpStyle/ContactChangeStatusPopUp.css";
import Http from '../services/http';
import { useSelector, useDispatch } from 'react-redux';
import { setContactData } from '../redux/contactSlice';


const ContactChangeStatusPopUp = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ownershipAndComentLoader, setOwnershipAndComentLoader] = useState(false);
    const [isOwnershipData, setIsOwnershipData]: any = useState([])
    const [isChangeStatus, setIsChangeStatus] = useState({
        id: [],
        ownershipId: "",
        standardComment: "",
    })
    const [errorMessage, setErrorMessage] = useState("");

    const dispatch = useDispatch()
    const { contactData } = useSelector((state: any) => state.contact)

    const selectedIds = useSelector((state: any) => state.contact.selectedIds)

    const changeStatusPopup = () => {
        setIsModalOpen(true)
        Http.get("user/get-user-list", false).then((ress: any) => {
            setIsOwnershipData(ress.data)
        }).catch((err: any) => {
            console.log(err);

        })
    }
    const handelContactChangeStatus = () => {
        if (!isChangeStatus.standardComment && !isChangeStatus.ownershipId) {
            setErrorMessage('Please select One Standard Comment and Ownership ');
            return;
        }
        setOwnershipAndComentLoader(true)
        CommentOwnershipClear()
        setIsModalOpen(false)
        const body: any = {
            id: selectedIds,
            standardComment: isChangeStatus.standardComment,
            ownershipId: isChangeStatus.ownershipId,
        }

        Http.put("contact/multiple-contact-update", body, true).then((res: any) => {
            dispatch(setContactData({ ...contactData, isRefresh: !contactData.isRefresh }))
            if (res.sec) {
                setOwnershipAndComentLoader(false)
                setIsModalOpen(false)
            } else (
                setOwnershipAndComentLoader(false),
                setIsModalOpen(false)
            )
        }).catch(() => {
            setOwnershipAndComentLoader(false)
        })
    }

    const CommentOwnershipClear = () => {
        setIsChangeStatus({
            id: [],
            ownershipId: "",
            standardComment: "",
        })
        setErrorMessage("");
    }

    const  standardComment = [
        { value: 'Follow-Up', label: 'Follow-Up' },
        { value: 'Follow-up on a specific Date/Time', label: 'Follow-up on a specific Date/Time' },
        { value: 'Hung-up', label: 'Hung-up' },
        { value: 'Manager with Active Requirements', label: 'Manager with Active Requirements' },
        { value: 'Connected Manager', label: 'Connected Manager' },
        { value: 'Voicemail', label: 'Voicemail' },
        { value: 'DND', label: 'DND' },
        { value: 'Number not in service', label: 'Number not in service' },
        { value: 'Wants to stick with standard Channel', label: 'Wants to stick with standard Channel' },
        { value: 'Wrong Number', label: 'Wrong Number' },
        { value: 'Handles Offshore Requirements', label: 'Handles Offshore Requirements' },
        { value: 'No number given', label: 'No number given' },
        { value: 'Not involved in hiring', label: 'Not involved in hiring' },
        { value: 'Call Later', label: 'Call Later' },
        { value: 'Call is not going through', label: 'Call is not going through' },
        { value: 'No Longer with company', label: 'No Longer with company' },
        { value: 'Reference', label: 'Reference' },
    ]

    return (
        <div>
            {selectedIds?.length > 0 ?
                <IoIosArrowDropdown
                    className='ContactChangeStatusIcon'
                    onClick={changeStatusPopup}
                />
                : ""}
            <Modal
                afterClose={() => { CommentOwnershipClear(); setIsModalOpen(false); }}
                className='contact-change-status-popUp'
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                width={570}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <div>
                    <div className='change-status-header'>
                        <p>Change Status</p>
                    </div>
                    <div className='to-input-main-sec'>
                        <div className='standard-comment'>
                            <span className='pb-2'>Standard Comment:</span>
                            <Select
                                className='standard-comment-ownership'
                                popupClassName='selected-box'
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                                onChange={(e: any) => {
                                    setIsChangeStatus({ ...isChangeStatus, standardComment: e })
                                }}
                                value={isChangeStatus.standardComment}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                options={standardComment}
                            />
                        </div>
                        <div className='Ownership'>
                            <span className='pb-2'>Ownership:</span>
                            <Select
                                className='standard-comment-ownership'
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                                filterOption={(input: any, option: any) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                                onChange={(e: any) => {
                                    setIsChangeStatus({ ...isChangeStatus, ownershipId: e })
                                }}
                                value={isChangeStatus.ownershipId}
                                options={isOwnershipData?.map((user: any) => {
                                    return {
                                        value: user?.id,
                                        label: user?.fullName
                                    }
                                })}
                            />
                        </div>
                    </div>
                    {errorMessage && (
                        <div className="text-red-500 mt-2 flex justify-center">
                            {errorMessage}
                        </div>
                    )}
                    <div className=' submit-cancel-btn'>
                        <Button className='sub-can-Submit'
                            loading={ownershipAndComentLoader}
                            disabled={ownershipAndComentLoader}
                            onClick={handelContactChangeStatus}
                        >
                            Submit
                        </Button>
                        <button className='sub-can-Cancel'
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ContactChangeStatusPopUp