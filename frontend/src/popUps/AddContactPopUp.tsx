
import { useEffect, useState } from 'react';
import { Button, DatePicker, Modal, Select, Space, message } from 'antd';
import '../styles/popUpStyle/addContactPopUp.css';
import Http from '../services/http';
import { FiEdit3 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { setContactData } from '../redux/contactSlice';

const AddContactPopUp = ({ cell }: any) => {
    const [contactBtnLoader, setContactBtnLoader] = useState(false);
    const [isGettingClientListLoader, setIsGettingClientListLoader] = useState(false);
    const [contactModalOpen, setContactModalOpen] = useState(false);
    const [isError, setIsError]: any = useState({});
    const [isClientNameData, setIsClientNameData]: any = useState([])
    const [isUserOwnershipData, setIsUserOwnershipData]: any = useState([])
    const [isCountryNameData, setIsCountryNameData]: any = useState([])
    const [isStateNameData, setIsStateNameData]: any = useState([]);
    const [isCityNameData, setIsCityNameData]: any = useState([]);
    const [isReportingManagerData, setIsReportingManagerData]: any = useState([]);
    const [addContact, setAddContact]: any = useState({
        clientId: '',
        firstName: '',
        lastName: '',
        ownershipId: '',
        contactTimeZone: '',
        phone1: "",
        phone2: "",
        phone3: "",
        email: '',
        alternateEmail: '',
        country: '',
        state: "",
        city: '',
        title: '',
        unit: '',
        endClient: '',
        skillsSupport: '',
        leadSource: '',
        linkedInProfile: '',
        standardComment: '',
        nextFollowUpDate: '',
        timeZone: '',
        reportingManagerId: '',
        notes: '',
        noteSource: '',
    })

    const dispatch = useDispatch()
    const { contactData } = useSelector((state: any) => state.contact)

    useEffect(() => {

        if (!contactModalOpen) return
        if (!addContact?.clientId) return
        getContactManagerList(addContact?.clientId);
        

    }, [contactModalOpen, addContact?.clientId])

    useEffect(() => {
        setAddContact({
            clientId: cell?.clientId,
            firstName: cell?.firstName,
            lastName: cell?.lastName,
            ownershipId: cell?.ownershipId,
            contactTimeZone: cell?.contactTimeZone,
            phone1: cell?.phone1,
            phone2: cell?.phone2,
            phone3: cell?.phone3,
            email: cell?.email,
            alternateEmail: cell?.alternateEmail,
            country: cell?.country,
            state: cell?.state,
            city: cell?.city,
            title: cell?.title,
            unit: cell?.unit,
            endClient: cell?.endClient,
            skillsSupport: cell?.skillsSupported,
            leadSource: cell?.leadSource,
            linkedInProfile: cell?.linkedInProfile,
            standardComment: cell?.standardComment,
            nextFollowUpDate: cell?.nextFollowUpDate,
            reportingManagerId: cell?.reportingManagerId,
        })

    }, [cell, contactModalOpen])

    const handleAddContactSubmit = (e: any) => {
        e.preventDefault();
        setContactBtnLoader(true)
        const body = {
            clientId: addContact.clientId,
            firstName: addContact.firstName,
            lastName: addContact.lastName,
            title: addContact.title,
            reportingManagerId: addContact.reportingManagerId || null,
            contactTimeZone: addContact.contactTimeZone,
            phone1: addContact.phone1,
            phone2: addContact.phone2,
            phone3: addContact.phone3,
            email: addContact.email,
            alternateEmail: addContact.alternateEmail,
            city: addContact.city,
            state: addContact.state,
            country: addContact.country,
            unit: addContact.unit,
            endClient: addContact.endClient,
            skillsSupported: addContact.skillsSupport,
            standardComment: addContact.standardComment,
            leadSource: addContact.leadSource,
            linkedInProfile: addContact.linkedInProfile,
            ownershipId: addContact.ownershipId,
            note: addContact.notes,
            nextFollowUpDateTime: addContact.nextFollowUpDate,
            timezone: addContact.timeZone,
            noteSource: addContact.noteSource,
        }


        if (cell?.id) {
            // getContactManagerList(e)
            Http.put("contact/update-contact", { ...body, id: cell?.id }, false).then((res: any) => {
                if (res.success) {
                    setContactBtnLoader(false)
                    setContactModalOpen(false)
                    setIsError({})
                    dispatch(setContactData({ ...contactData, isRefresh: !contactData.isRefresh }))
                } else {
                    setContactBtnLoader(false)
                }
            }).catch((err: any) => {
                setContactBtnLoader(false)
                err.data.message && message.error(err.data.message);
                setIsError(err?.data?.errors || [])

            })
        } else {

            Http.post("contact/add-contact", body, false).then((res: any) => {
                setContactBtnLoader(true)

                if (res.success) {
                    setContactBtnLoader(false)
                    setContactModalOpen(false)
                    setIsError({})
                    dispatch(setContactData({ ...contactData, isRefresh: !contactData.isRefresh }))
                } else {
                    setContactBtnLoader(false)
                }
            }).catch((err: any) => {
                setContactBtnLoader(false)
                err.data.message && message.error(err.data.message);
                setIsError(err?.data?.errors || [])
            })
        }
    }


    const clearAllState = () => {
        setAddContact({
            clientId: '',
            firstName: '',
            lastName: '',
            ownershipId: '',
            contactTimeZone: '',
            phone1: "",
            phone2: "",
            phone3: "",
            email: '',
            alternateEmail: '',
            country: '',
            state: "",
            city: '',
            title: '',
            unit: '',
            endClient: '',
            skillsSupport: '',
            leadSource: '',
            linkedInProfile: '',
            standardComment: '',
            nextFollowUpDate: '',
            timeZone: '',
            reportingManagerId: '',
            notes: '',
            noteSource: '',
        });
        setIsError({})
        setIsReportingManagerData([])
        setContactBtnLoader(false)
    }

    const allGetApiForUserClient = () => {
        setContactModalOpen(true)
        setIsGettingClientListLoader(true)
        allInOneClientSearch()
        allInOneUserData()
        handleGetCountryData()
    }

    const allInOneClientSearch = () => {
        Http.get("client/get-clients", false).then((res: any) => {
            setIsClientNameData(res.data)
            setIsGettingClientListLoader(false)
        }).catch(() => {
            setIsGettingClientListLoader(false)
        })

    }

    const allInOneUserData = () => {
        Http.get("user/get-user-list", false).then((ress: any) => {
            setIsUserOwnershipData(ress.data)
            setIsGettingClientListLoader(false)
        }).catch(() => {
            setIsGettingClientListLoader(false)
        })
    }

    const handleGetCountryData = () => {
        Http.get("location/get-countries", false).then((res: any) => {
            setIsCountryNameData(res.data)
            // setAddContact({ ...addContact, state: "", city: "", });
            setIsGettingClientListLoader(false)
            setIsStateNameData([])
        }).catch(() => {
            setIsGettingClientListLoader(false)
        })
    }

    const handleGetStateData = (countryId: any) => {
        const body: any = {
            countryId,
        }
        Http.post("location/get-states", body, false).then((res: any) => {
            setIsStateNameData(res.states)
            setIsGettingClientListLoader(false)
            setIsCityNameData([])
        }).catch(() => {
            setIsGettingClientListLoader(false)
        })
    }

    const handleGetCityData = (stateId: any) => {
        const body: any = {
            stateId
        }
        Http.post("location/get-cities", body, false).then((res: any) => {
            setIsCityNameData(res.cities)
            setIsGettingClientListLoader(false)
        }).catch(() => {
            setIsGettingClientListLoader(false)
        })
    }

    const getContactManagerList = (id: any) => {
        
        if (!id) return
        Http.get(`contact/contact-manager-list/${id}`, true).then((res: any) => {
            setIsReportingManagerData(res.data);
            setIsGettingClientListLoader(false)
        }).catch(() => {
            setIsGettingClientListLoader(false)
        })
    }


    return (
        <>
            <div>
                {
                    cell?.id ? <FiEdit3 onClick={allGetApiForUserClient} className="cursor-pointer text-gray-400 ml-1" size={16} />
                        :
                        <button
                            className="client-table-head-add-client"
                            onClick={allGetApiForUserClient}>
                            Add Contact
                        </button>
                }
            </div >

            <Modal
                className='contact-pop-modal'
                wrapClassName='addcontact-popup'
                afterClose={() => { clearAllState(); setContactModalOpen(false); }}
                open={contactModalOpen}
                width={1300}
                onOk={() => handleAddContactSubmit}
                onCancel={() => setContactModalOpen(false)}
                footer={null}
            >
                <form onSubmit={handleAddContactSubmit}>
                    <div className='main-contact-popUp-body'>
                        <div className='add-contact-btn' >
                            <p className='addContact-heading'>{cell?.id ? "Edit Contact" : "Add Contact"}</p>
                            <p className='font-mulish text-base font-bold text-black'>{cell?.id ? `Edit Contact Of (${cell.fullName})` : ""}</p>
                        </div>

                        <div className='all-input-sec'>
                            <div className='contact-form-main'>
                                <div className='add-contact-label-input'>
                                    <label htmlFor="" className='add-contact-label'><span className='text-red-600 text-lg p-0 m-0' >*</span> Client Name :</label>
                                    <Select
                                        className='add-contact-select-modal'
                                        showSearch
                                        defaultValue={"Select"}
                                        optionFilterProp="children"
                                        value={addContact?.clientId || ""}
                                        onChange={(e: any) => {
                                            setAddContact({ ...addContact, clientId: e })
                                            getContactManagerList(e)
                                        }}
                                        filterOption={(input: any, option: any) =>
                                            (option?.label ?? "")?.toLowerCase()?.includes(input?.toLowerCase())
                                        }
                                        loading={isGettingClientListLoader}
                                        options={isClientNameData?.map((client: any) => {
                                            return {
                                                value: client?.id,
                                                label: client?.clientName
                                            }
                                        })}
                                    />
                                    {isError?.clientId && <span className='text-red-500 text-xs'>{isError?.clientId}</span>}
                                </div>

                                <div className='add-contact-label-input'>
                                    <label htmlFor="" className='add-contact-label'><span className='text-red-600 text-lg p-0 m-0' >*</span> First Name :</label>
                                    <input type="text"
                                        className='contact-input-section'
                                        value={addContact?.firstName || ""}
                                        onChange={(e: any) => setAddContact({ ...addContact, firstName: e.target.value })}
                                    />
                                    {isError?.firstName && <span className='text-red-600 text-xs'>{isError?.firstName}</span>}
                                </div>

                                <div className='add-contact-label-input !pt-1'>
                                    <label htmlFor="" className='add-contact-label'>Last Name :</label>
                                    <input type="text" className='contact-input-section'
                                        onChange={(e: any) => setAddContact({ ...addContact, lastName: e.target.value })}
                                        value={addContact?.lastName || ""} />
                                </div>

                                <div className='add-contact-label-input'>
                                    <label htmlFor="" className='add-contact-label'><span className='text-red-600 text-lg' >*</span > Ownership :</label>
                                    <Select
                                        className='add-contact-select-modal'
                                        showSearch
                                        optionFilterProp="children"
                                        onChange={(e: any) => {
                                            setAddContact({ ...addContact, ownershipId: e })
                                        }}
                                        value={addContact?.ownershipId || ""}
                                        filterOption={(input: any, option: any) =>
                                            (option?.label ?? '')?.toLowerCase().includes(input.toLowerCase())
                                        }
                                        loading={isGettingClientListLoader}
                                        options={isUserOwnershipData?.map((user: any) => {
                                            return {
                                                value: user?.id,
                                                label: user?.fullName
                                            }
                                        })}
                                    />
                                    {isError?.ownershipId && <span className='text-red-600 text-xs'>{isError?.ownershipId}</span>}

                                </div>

                                <div className='add-contact-label-input !pt-1'>
                                    <label htmlFor="" className='add-contact-label'>Contact Time Zone :</label>
                                    <Select
                                        className='add-contact-select-modal'
                                        showSearch
                                        optionFilterProp="children"
                                        onChange={(e: any) => {
                                            setAddContact({ ...addContact, contactTimeZone: e })
                                        }}
                                        value={addContact?.contactTimeZone || ""}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { value: '', label: 'Select' },
                                            { value: 'IST', label: 'IST' },
                                            { value: 'HST', label: 'HST' },
                                            { value: 'AKST', label: 'AKST' },
                                            { value: 'PST', label: 'PST' },
                                            { value: 'CST', label: 'CST' },
                                            { value: 'MST', label: 'MST' },
                                            { value: 'EST', label: 'EST' },

                                        ]}
                                    />
                                </div>

                                <div className='add-contact-label-input'>
                                    <label htmlFor="" className='add-contact-label'><span className='text-red-600 text-lg' >*</span> Phone Number 1 :</label>
                                    <input
                                        className='contact-input-section'

                                        onChange={(e: any) => setAddContact({ ...addContact, phone1: e.target.value.replace(/\D+/g, "") })}
                                        value={addContact?.phone1 || ""} />
                                    {isError?.phone1 && <span className='text-red-600 text-xs'>{isError?.phone1}</span>}

                                </div>

                                <div className='add-contact-label-input !pt-1' >
                                    <label htmlFor="" className='add-contact-label'>Phone Number 2 :</label>
                                    <input className='contact-input-section'

                                        onChange={(e: any) => setAddContact({ ...addContact, phone2: e.target.value.replace(/\D+/g, "") })}
                                        value={addContact?.phone2 || ""} />
                                    {/* <PhoneInput
                                      placeholder='Enter Phone number'
                                        inputClass='phone-input-flag'
                                        country={'us'}
                                        value={addContact?.phone2 || ""} 
                                        onChange={(e: any) => setAddContact({ ...addContact, phone2: e?.target?.value?.replace(/\D+/g, "") })}
                                    /> */}
                                </div>

                                <div className='add-contact-label-input !pt-1'>
                                    <label htmlFor="" className='add-contact-label'>Phone Number 3 :</label>
                                    <input className='contact-input-section'

                                        onChange={(e: any) => setAddContact({ ...addContact, phone3: e.target.value.replace(/\D+/g, "") })}
                                        value={addContact?.phone3 || ""} />
                                </div>

                                <div className='add-contact-label-input'>
                                    <label htmlFor="" className='add-contact-label'><span className='text-red-600 text-lg' >*</span> Email :</label>
                                    <input type="text"
                                        className='contact-input-section'
                                        onChange={(e: any) => setAddContact({ ...addContact, email: e.target.value })}
                                        value={addContact?.email || ""} />
                                    {isError?.email && <span className='text-red-600 text-xs'>{isError?.email}</span>}

                                </div>

                                <div className='add-contact-label-input'>
                                    <label htmlFor="" className='add-contact-label'>Alternate Email:</label>
                                    <input type="text" className='contact-input-section'
                                        onChange={(e: any) => setAddContact({ ...addContact, alternateEmail: e.target.value })}
                                        value={addContact?.alternateEmail || ""} />
                                </div>

                                <div className='add-contact-label-input'>
                                    <label htmlFor="" className='add-contact-label'>Country :</label>
                                    <Select
                                        className='add-contact-select-modal'
                                        showSearch
                                        value={addContact?.country || ""}
                                        optionFilterProp="children"
                                        onChange={(_e: any, option) => {
                                            setAddContact({ ...addContact, country: option.label, state: "", city: "" });
                                            handleGetStateData(option.value);
                                        }}
                                        filterOption={(input: any, option: any) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={isCountryNameData?.map((countryName: any) => {
                                            return {
                                                value: countryName.id,
                                                label: countryName.name,
                                            }
                                        })}
                                    />
                                </div>

                                <div className='add-contact-label-input'>
                                    <label htmlFor="" className='add-contact-label'>State :</label>
                                    <Select
                                        className='add-contact-select-modal'
                                        showSearch
                                        popupClassName=''
                                        optionFilterProp="children"
                                        value={addContact?.state || ""}
                                        onChange={(_e: any, option) => {
                                            setAddContact({ ...addContact, state: option.label, city: "" })
                                            handleGetCityData(option.value)
                                        }}
                                        filterOption={(input: any, option: any) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={isStateNameData.length > 0 ? isStateNameData?.map((stateName: any) => {
                                            return {
                                                value: stateName.id,
                                                label: stateName.name
                                            }
                                        }) : [{ value: "Please select country first...", disabled: true }]}
                                    />
                                </div>

                                <div className='add-contact-label-input'>
                                    <label htmlFor="" className='add-contact-label'>City :</label>
                                    <Select
                                        className='add-contact-select-modal'
                                        showSearch
                                        value={addContact?.city || ""}
                                        optionFilterProp="children"
                                        onChange={(_e: any, option: any) => {
                                            setAddContact({ ...addContact, city: option?.label })
                                        }}
                                        filterOption={(input: any, option: any) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={isCityNameData.length > 0 ? isCityNameData?.map((cityName: any) => {
                                            return {
                                                value: cityName.id,
                                                label: cityName.name
                                            }
                                        }) : [{ value: "Please select State first...", disabled: true }]}
                                    />
                                </div>

                                <div className='add-contact-label-input'>
                                    <label htmlFor="" className='add-contact-label'>Title :</label>
                                    <input type="text" className='contact-input-section'
                                        onChange={(e: any) => setAddContact({ ...addContact, title: e.target.value })}
                                        value={addContact?.title || ""} />
                                </div>

                                <div className='add-contact-label-input'>
                                    <label htmlFor="" className='add-contact-label'>Unit:</label>
                                    <input type="text" className='contact-input-section'
                                        onChange={(e: any) => setAddContact({ ...addContact, unit: e.target.value })}
                                        value={addContact?.unit || ""} />
                                </div>

                                <div className='add-contact-label-input'>
                                    <label htmlFor="" className='add-contact-label'>End Client :</label>
                                    <input type="text" className='contact-input-section'
                                        onChange={(e: any) => setAddContact({ ...addContact, endClient: e.target.value })}
                                        value={addContact?.endClient || ""} />
                                </div>

                                <div className='add-contact-label-input'>
                                    <label htmlFor="" className='add-contact-label'>Skills Support :</label>
                                    <input type="text"
                                        value={addContact?.skillsSupport || ""}
                                        className='contact-input-section'
                                        onChange={(e: any) => setAddContact({ ...addContact, skillsSupport: e.target.value })}
                                    />
                                </div>

                                <div className='add-contact-label-input'>
                                    <label htmlFor="" className='add-contact-label'>Lead Source :</label>
                                    <Select
                                        className='add-contact-select-modal'
                                        showSearch
                                        optionFilterProp="children"
                                        onChange={(e: any) => {
                                            setAddContact({ ...addContact, leadSource: e })
                                        }}
                                        value={addContact?.leadSource || ""}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { value: '', label: 'Select' },
                                            { value: 'Linkedin', label: 'Linkedin' },
                                            { value: 'ZoomInfo', label: 'ZoomInfo' },
                                            { value: 'Internal Data', label: 'Internal Data' },
                                            { value: 'Client Reference', label: 'Client Reference' },
                                            { value: "Internal Team's Reference", label: "Internal Team's Reference" },
                                        ]}
                                    />
                                </div>

                                <div className='add-contact-label-input'>
                                    <label htmlFor="" className='add-contact-label'>LinkedIn Profile :</label>
                                    <input type="text"
                                        placeholder="Starts with 'https://'"
                                        className='contact-input-section'
                                        onChange={(e: any) => setAddContact({ ...addContact, linkedInProfile: e.target.value })}
                                        value={addContact?.linkedInProfile || ""} />
                                </div>

                                <div className='add-contact-label-input'>
                                    <label htmlFor="" className='add-contact-label'>Standard Comment :</label>
                                    <Select
                                        className='add-contact-select-modal'
                                        showSearch
                                        optionFilterProp="children"
                                        onChange={(e: any) => {
                                            setAddContact({ ...addContact, standardComment: e })
                                        }}
                                        value={addContact?.standardComment || ""}
                                        filterOption={(input: any, option: any) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }

                                        options={[
                                            { value: '', label: 'Select' },
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

                                {cell?.id ? null : <>
                                    <div className='add-contact-label-input'>
                                        <label htmlFor="" className='add-contact-label'>Next Follow-up Date :</label>
                                        <Space direction="vertical" size={12}>
                                            <DatePicker
                                                placeholder={"dd-mm-yyyy"}
                                                showSecond={false}
                                                clearIcon={false}
                                                value={addContact?.nextFollowUpDate || ""}
                                                onChange={(e: any) => {
                                                    setAddContact({ ...addContact, nextFollowUpDate: e })
                                                }}
                                                className='add-contact-input-field'
                                                popupClassName='date-ok-button'
                                                showTime
                                            />
                                        </Space>
                                    </div>
                                    <div className='add-contact-label-input'>
                                        <label htmlFor="" className='add-contact-label'>Time Zone :</label>
                                        <Select
                                            className='add-contact-select-modal'
                                            showSearch
                                            optionFilterProp="children"
                                            onChange={(e: any) => {
                                                setAddContact({ ...addContact, timeZone: e })
                                            }}
                                            value={addContact.timeZone}
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            options={[
                                                { value: '', label: 'Select' },
                                                { value: 'IST', label: 'IST' },
                                                { value: 'HST', label: 'HST' },
                                                { value: 'AKST', label: 'AKST' },
                                                { value: 'PST', label: 'PST' },
                                                { value: 'CST', label: 'CST' },
                                                { value: 'MST', label: 'MST' },
                                                { value: 'EST', label: 'EST' }
                                            ]}
                                        />
                                    </div>
                                </>}

                                <div className='add-contact-label-input'>
                                    <label htmlFor="" className='add-contact-label'>Reporting Manager :</label>
                                    <Select
                                        className='add-contact-select-modal'
                                        showSearch
                                        optionFilterProp="children"
                                        onChange={(e: any) => {
                                            setAddContact({ ...addContact, reportingManagerId: e })
                                        }}
                                        value={addContact?.reportingManagerId || ""}
                                        filterOption={(input: any, option: any) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={isReportingManagerData?.map((reportingManager: any) => {
                                            return {
                                                value: reportingManager.id,
                                                label: <span>{reportingManager.fullName} <b>({reportingManager.email})</b> </span>,
                                            }
                                        })}
                                    />
                                </div>

                                {cell?.id ? null :
                                    <div className='add-contact-label-input'>
                                        <label htmlFor="" className='add-contact-label'>Notes :</label>
                                        <textarea name="" id="" cols={32} rows={4.5} className='contact-textarea-input-section'
                                            onChange={(e: any) => setAddContact({ ...addContact, notes: e.target.value })}
                                            value={addContact?.notes || ""}
                                        ></textarea>

                                        <div>
                                            <p className='note-source-sec'> <span className='text-red-600 text-lg' >*</span> Note Source:</p>
                                            <div className=' radio-btn'>
                                                <div className=' Incoming-Outgoing '>
                                                    <input type="radio"
                                                        onChange={() => setAddContact({ ...addContact, noteSource: '0' })}
                                                        checked={addContact.noteSource == "0" && true} id='Incoming'
                                                        name="call" />
                                                    <label htmlFor="Incoming">Incoming</label>
                                                </div>

                                                <div className='Incoming-Outgoing'>
                                                    <input type="radio"
                                                        onChange={() => setAddContact({ ...addContact, noteSource: '1' })}
                                                        checked={addContact.noteSource == "1" && true}
                                                        id="Outgoing"
                                                        name="call" />
                                                    <label htmlFor="Outgoing">Outgoing</label>
                                                </div>
                                            </div>
                                            {isError?.noteSource && <span className='text-red-600 text-xs'>{isError?.noteSource}</span>}
                                        </div>
                                    </div>}
                            </div>

                            <div className='add-contact-right-btn'>
                                <Button
                                    className='add-contact-submit'
                                    loading={contactBtnLoader}
                                    disabled={contactBtnLoader}
                                    htmlType="submit">{cell?.id ? "Update" : "Submit"}
                                </Button>
                                <button
                                    className='add-contact-clear'
                                    type='reset'
                                    onClick={clearAllState}>Clear</button>
                            </div>

                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default AddContactPopUp;