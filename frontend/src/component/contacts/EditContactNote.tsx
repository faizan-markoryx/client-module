import { useEffect, useState } from 'react'
import { Button, DatePicker, Modal, Radio, Select, Space } from 'antd';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { updateNote } from '../../services/contactAddNote';
import { setContactData, setContactNoteRefresh, } from '../../redux/contactSlice';
import { useLocation } from 'react-router';
import { LuEdit } from 'react-icons/lu';
import { RiFileEditLine } from 'react-icons/ri';
import '../../styles/popUpStyle/EditContactNote.css'


const EditContactNote = ({ editNoteData }: any) => {

    const [isEditNote, setIsEditNote]: any = useState(false);
    const [isEditNoteLoader, setIsEditNoteLoader]: any = useState(false);
    const select = useSelector(
        (state: any) => state?.contact?.contactTableNoteData
    );
    const { contactData } = useSelector((state: any) => state?.contact)
    const [standardComment, setStandardComment] = useState("");
    const dispatch = useDispatch();
    const location = useLocation()
    const [updateNoteBody, setUpdateNoteBody]: any = useState({
        id: "",
        note: "",
        noteSource: "",
        labels: [],
        nextFollowUpDateTime: "",
        timezone: "",
        changeStandardComment: ""
    });

    useEffect(() => {
        setStandardComment(select?.standardComment)
    }, [select, isEditNote]);

    useEffect(() => {
        setUpdateNoteBody({
            id: editNoteData?.id,
            note: editNoteData?.note,
            noteSource: editNoteData?.noteSource,
            labels: editNoteData?.contactNoteLabels,
            nextFollowUpDateTime: editNoteData?.nextFollowUpDateTime,
            timezone: editNoteData?.timezone,
            changeStandardComment: standardComment
        })
    }, [editNoteData, select, standardComment])



    const handleUpdateNote = () => {
        setIsEditNoteLoader(true)
        updateNote(updateNoteBody)
            .then((res: any) => {
                if (res.success) {
                    setIsEditNoteLoader(false)
                    dispatch(setContactNoteRefresh())
                    dispatch(setContactData({ ...contactData, isRefresh: false }))

                    setUpdateNoteBody({
                        id: "",
                        note: "",
                        noteSource: "",
                        labels: [],
                        nextFollowUpDateTime: "",
                        timezone: "",
                        changeStandardComment: ""
                    })
                } else {
                    setIsEditNoteLoader(false)
                }
                setIsEditNote(false)
            }).catch(() => {
                setIsEditNoteLoader(false)
            })
    }
    return (
        <>

            {
                location.pathname !== "/notification" && <button className="text-xl" onClick={() => { setIsEditNote(true) }}><LuEdit /></button>
            }

            {
                location.pathname == "/notification" && <RiFileEditLine className='text-2xl text-[green] cursor-pointer' onClick={() => { setIsEditNote(true) }} />
            }



            <Modal
                width={551}
                className='contact-add-note-popup'
                centered={true}
                open={isEditNote}
                onOk={() => setIsEditNote(false)}
                onCancel={() => setIsEditNote(false)}
                footer={null}
                afterClose={() => setUpdateNoteBody({
                    id: editNoteData?.id,
                    note: editNoteData?.note,
                    noteSource: editNoteData?.noteSource,
                    labels: editNoteData?.contactNoteLabels,
                    nextFollowUpDateTime: editNoteData?.nextFollowUpDateTime,
                    timezone: editNoteData?.timezone,
                    changeStandardComment: standardComment
                })} >
                <div>
                    <div className='flex justify-between bg-primary h-14 border-b items-center pl-5 pr-4 rounded-t-[10px]'>
                        <h1 className='text-xl text-white'>Edit Note For <span>( {editNoteData?.contactName == undefined ? select.fullName : editNoteData?.contactName} )</span></h1>
                        <span className='text-2xl text-white cursor-pointer' onClick={() => setIsEditNote(false)}><AiOutlineClose /></span>
                    </div>

                    <div className='flex items-center gap-3 pl-5 pr-4 pt-1'>
                    </div>
                    <div className='flex flex-col justify-center text-start pl-5 pr-4 pt-1'>
                        <label htmlFor="" className='text-primary font-medium flex gap-1'><span className='text-red-500 text-lg'>*</span>Add Note:</label>

                        <textarea typeof="text" onChange={(e: any) => setUpdateNoteBody({ ...updateNoteBody, note: e.target.value })}

                            value={updateNoteBody?.note} className='bg-[#F2F2F2] pl-3 pt-1 resize-none hover:border-black focus:border-black 
                        
                        border border-gray-300 focus:outline-none h-[125px] w-[500px] rounded-lg' />

                    </div>
                    <div className='pl-5 pr-4 mt-10'>
                        <div className="flex items-center gap-4">
                            <h1 className="text-primary font-medium">Next Follow-up Date:</h1>
                            <h1 className="text-primary font-medium ">Time Zone:</h1>
                            <div className="flex items-center pl-10">
                                <span className="text-red-500 text-lg pt-[3px]">*</span>
                                <h1 className="text-primary font-medium">Note Source:</h1>
                            </div>
                        </div>

                        <div className='flex gap-2  justify-center items-center'>
                            <div>
                                <Space direction="vertical" size={12}>
                                    {
                                        updateNoteBody?.nextFollowUpDateTime ?
                                            <DatePicker className='!bg-[#F2F2F2]'
                                                showNow={false}
                                                showTime
                                                popupClassName='edit-date-ok-but'
                                                showSecond={false}
                                                clearIcon={false}
                                                value={dayjs(updateNoteBody?.nextFollowUpDateTime)}
                                                onChange={(_value: any, date: any) => {
                                                    setUpdateNoteBody({
                                                        ...updateNoteBody,
                                                        nextFollowUpDateTime: date
                                                    })
                                                }
                                                }
                                            />
                                            :
                                            <DatePicker className='!bg-[#F2F2F2]'
                                                showNow={false}
                                                popupClassName='edit-date-ok-but'
                                                showTime
                                                showSecond={false}
                                                clearIcon={false}
                                                onChange={(_value: any, date: any) => {
                                                    setUpdateNoteBody({
                                                        ...updateNoteBody,
                                                        nextFollowUpDateTime: date
                                                    })
                                                }
                                                }
                                            />
                                    }

                                </Space>
                            </div>
                            <div>
                                <Select
                                    className='time-select'
                                    defaultValue=""
                                    style={{ width: 120 }}
                                    onChange={(value: any) => setUpdateNoteBody({ ...updateNoteBody, timezone: value })}
                                    value={updateNoteBody?.timezone}
                                    options={[
                                        { value: 'IST', label: 'IST' },
                                        { value: 'HST', label: 'HST' },
                                        { value: 'AKST', label: 'AKST' },
                                        { value: 'PST', label: 'PST' },
                                        { value: 'MST', label: 'MST' },
                                        { value: 'CST', label: 'CST' },
                                        { value: 'EST', label: 'EST' },

                                    ]}
                                />
                            </div>
                            <div>
                                <div className='flex gap-2'>
                                    <div className='cursor-pointer text-center bg-[#F2F2F2] h-8 w-28 rounded-lg pl-4 flex justify-center items-center gap-2 border border-gray-300'>
                                        <Radio
                                            id='incomingg'
                                            onChange={() => setUpdateNoteBody({ ...updateNoteBody, noteSource: 0 })}
                                            type="radio"
                                            className='cursor-pointer font-medium'
                                            name='call'
                                            checked={updateNoteBody?.noteSource === 0} value={0}>Incoming</Radio>
                                    </div>

                                    <div className='cursor-pointer text-center  bg-[#F2F2F2] h-8 w-28 rounded-lg pl-4 flex justify-center items-center gap-2 border border-gray-300'>
                                        <Radio
                                            id='outgoingg'
                                            className='cursor-pointer font-medium'
                                            onChange={() => setUpdateNoteBody({ ...updateNoteBody, noteSource: 1 })}
                                            type="radio"
                                            name='call'
                                            checked={updateNoteBody?.noteSource === 1}
                                            value={1}
                                        >Outgoing</Radio>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-2 mt-8'>
                            {
                                location.pathname !== "/notification" &&
                                <div className='flex flex-col'>
                                    <label htmlFor="" className='text-primary font-medium mb-3'>Change Standard Comment:</label>
                                    <Select
                                        className='time-select'
                                        defaultValue="Select"
                                        showSearch
                                        value={standardComment}
                                        style={{ width: 260 }}
                                        // onChange={(value) => { setUpdateNoteBody({ ...updateNoteBody, changeStandardComment: value }); setStandardComment(value) }}
                                        onChange={(value) => { setStandardComment(value) }}
                                        onSearch={(value: string) => {
                                            console.log('search:', value);
                                        }}
                                        options={[
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
                                        ]}
                                    />
                                </div>
                            }


                            <div className='flex flex-col'>
                                <label htmlFor="" className='text-primary font-medium mb-3'>Label:</label>
                                <Select
                                    className='time-select'
                                    showSearch
                                    value={updateNoteBody?.labels?.map((ele: any) => { return ele })}
                                    mode="multiple"
                                    style={{ width: 210 }}
                                    optionFilterProp="children"

                                    onChange={(value) => setUpdateNoteBody({ ...updateNoteBody, labels: value })}
                                    onSearch={(value: string) => {
                                        console.log('search:', value);
                                    }}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={[
                                        {
                                            value: 'Follow-up',
                                            label: 'Follow-Up',
                                        },
                                        {
                                            value: 'Email Follow-Up',
                                            label: 'Email Follow-Up',
                                        },
                                        {
                                            value: 'Submission',
                                            label: 'Submission',
                                        },
                                        {
                                            value: 'Interview Scheduled',
                                            label: 'Interview Scheduled',
                                        },
                                        {
                                            value: 'Interview Done',
                                            label: 'Interview Done',
                                        },
                                        {
                                            value: 'Introduction',
                                            label: 'Introduction',
                                        },
                                    ]}
                                />
                            </div>


                        </div>
                    </div>
                    <div className='flex gap-3 absolute right-14 bottom-6'>
                        <Button loading={isEditNoteLoader} disabled={isEditNoteLoader}
                            className='!bg-primary cursor-pointer h-8 w-24 rounded-xl !text-white' onClick={() => { handleUpdateNote() }}>Update</Button>

                    </div>
                </div>
            </Modal>

        </>
    )
}

export default EditContactNote