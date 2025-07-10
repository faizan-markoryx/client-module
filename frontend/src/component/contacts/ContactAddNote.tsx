import {
  Button,
  DatePicker,
  DatePickerProps,
  Modal,
  Radio,
  Select,
  Space,
  message,
} from "antd";
import { useEffect, useState } from "react";
import "../../styles/popUpStyle/ContactAddNote.css";
import { AiOutlineClose } from "react-icons/ai";
import { addContactNote, readNoteAPI } from "../../services/contactAddNote";
import { useDispatch, useSelector } from "react-redux";
import {
  setContactData,
  setContactNoteRefresh,
  setContactTableNoteData,
} from "../../redux/contactSlice";
import { MdNote } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { BiAddToQueue } from "react-icons/bi";
import { BsPlusCircleFill } from "react-icons/bs";

const ContactAddNote = ({ row, ele }: any) => {
  const [isAddNote, setIsAddNote] = useState(false);
  const [isLoaderSave, setIsLoaderSave] = useState(false);
  const [notificationAddNoteId, setNotificationAddNoteId] = useState("");


  const [isAddReq, setIsAddReq] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [reqData, setReqData] = useState({
    title: "",
    location: "",
    duration: "",
    type: "",
    rate: "",
    visa: "",
    skills: "",
    endClient: "",
    partner: "",
  });


  const select = useSelector(
    (state: any) => state?.contact?.contactTableNoteData
  );
  const { contactData } = useSelector((state: any) => state?.contact);
  const [isAddNoteData, setIsAddNoteData]: any = useState({});

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAddNote) return;
    setIsAddNoteData({
      contactId: !ele ? select?.id : ele?.contactId,
      note: "",
      noteSource: "",
      nextFollowUpDateTime: "",
      // timezone: isAddNoteData?.timezone !== "" ? "CST" : isAddNoteData?.timezone,
      timezone: isAddNoteData?.timezone || "CST",
      labels: [],
      changeStandardComment: "",
    });
  }, [select, ele, isAddNote]);

  const handleSubmitNote = (e: any) => {
    e.preventDefault();

    setIsLoaderSave(true);
    const dateFormat = "YYYY-MM-DD HH:mm:ss";
    if (isAddNoteData?.noteSource !== "") {
      addContactNote({
        ...isAddNoteData,
        nextFollowUpDateTime:
          isAddNoteData?.nextFollowUpDateTime &&
          isAddNoteData?.nextFollowUpDateTime?.format(dateFormat),
      })
        .then((res: any) => {
          if (res.success) {
            if (notificationAddNoteId) {
              readNoteAPI({
                contactNoteId: notificationAddNoteId,
                isDone: 1,
              })
                .then((res: any) => {
                  console.log("res>>", res);
                })
                .catch((err: any) => {
                  console.log("err", err);
                });
            }

            setIsLoaderSave(false);
            dispatch(setContactNoteRefresh());
            dispatch(
              setContactData({
                ...contactData,
                isRefresh: !contactData.isRefresh,
              })
            );
            setIsAddNoteData({
              contactId: !ele ? select?.id : ele?.contactId,
              note: "",
              noteSource: "",
              nextFollowUpDateTime: "",
              timezone: "",
              labels: [],
              changeStandardComment: "",
            });
            setIsAddNote(false);
          } else {
            setIsLoaderSave(false);
            setIsAddNote(false);
          }
        })
        .catch(() => {
          setIsLoaderSave(false);
        });
    } else {
      message.error("Please Select NoteSource");
      setIsLoaderSave(false);
    }
  };

  const handleClearNotes = () => {
    setIsAddNoteData({
      contactId: !ele ? select?.id : ele?.contactId,
      note: "",
      noteSource: "",
      nextFollowUpDateTime: "",
      timezone: "",
      labels: [],
      changeStandardComment: "",
    });
  };

  const myNotes = (data: any) => {
    dispatch(setContactTableNoteData(data));
  };




  const handleSubmitRequirement = (e: any) => {
    console.log("e>>>>>", e)
  }

  const handleClearRequirement = () => {
    console.log("Hello")
  }

  return (
    <>
      {location.pathname !== "/notification" ? (
        <>
          {row ? (
            <span
              className="flex gap-1 items-center flex-row text-[#8d8d8d]"
              onClick={() => {
                myNotes(row?.original);
                setIsAddNote(true);
              }}
            >
              <MdNote
                style={{ marginLeft: "5px" }}
                onClick={() => {
                  setIsAddNote(true);
                }}
                className="cursor-pointer min-w-[1rem]"
              />
              <span className="cursor-pointer overflow-hidden text-ellipsis">Add note</span>
            </span>
          ) : (
            <>
              <div className="flex justify-end items-center gap-6">
                <button
                  className="add-more-but"
                  onClick={() => {
                    setIsAddReq(true);
                  }}
                >
                  <BsPlusCircleFill
                    onClick={() => {
                      setIsAddReq(true);
                    }}
                    className="text-[#F57C00] text-xl"
                  />
                  Add New Requirement
                </button>
                <button
                  className="add-more-but"
                  onClick={() => {
                    setIsAddNote(true);
                  }}
                >
                  <BsPlusCircleFill
                    onClick={() => {
                      setIsAddNote(true);
                    }}
                    className="text-[#F57C00] text-xl"
                  />
                  Add More Notes
                </button>
              </div>

            </>
          )}
        </>
      ) : (
        <BiAddToQueue
          className="text-2xl text-primary cursor-pointer"
          onClick={() => {
            setIsAddNote(true);
            setNotificationAddNoteId(ele?.id);
          }}
        />
      )}


      {/* Add Notes Model */}
      <Modal
        width={551}
        className="contact-add-note-popup"
        centered={true}
        open={isAddNote}
        onOk={() => setIsAddNote(false)}
        onCancel={() => setIsAddNote(false)}
        footer={null}
        afterClose={() =>
          setIsAddNoteData({
            contactId: "",
            note: "",
            noteSource: "",
            nextFollowUpDateTime: "",
            timezone: "",
            labels: [],
            changeStandardComment: "",
          })
        }
      >
        <form onSubmit={handleSubmitNote}>
          <div className="flex justify-between bg-[#121820] h-14 border-b items-center pl-5 pr-4 rounded-t-[10px]">
            <h1 className="text-xl text-white">
              Add Note For{" "}
              <span>
                {" "}
                ({" "}
                {location.pathname !== "/notification" ? (
                  <>{select.fullName}</>
                ) : (
                  <>{ele?.contactName} </>
                )}{" "}
                )
              </span>
            </h1>
            <span
              onClick={() => setIsAddNote(false)}
              className="text-2xl text-white cursor-pointer"
            >
              <AiOutlineClose />
            </span>
          </div>

          <div className="flex items-center gap-3 pl-5 pr-4 pt-1"></div>
          <div className="flex flex-col justify-center text-start pl-5 pr-4 pt-1">
            <label htmlFor="" className="text-primary font-medium flex gap-1">
              <span className="text-red-500 text-lg">*</span>Add Note:
            </label>
            <textarea
              required
              value={isAddNoteData?.note}
              onChange={(e: any) =>
                setIsAddNoteData({ ...isAddNoteData, note: e?.target?.value })
              }
              typeof="text"
              className="bg-[#F2F2F2] pl-3 pt-1 resize-none hover:border-black focus:border-black border border-gray-300 focus:outline-none h-[125px] w-[512px] rounded-lg"
            />
          </div>
          <div className="pl-5 pr-4 mt-12">
            <div className="flex items-center gap-4">
              <h1 className="text-primary font-medium">Next Follow-up Date:</h1>
              <h1 className="text-primary font-medium ">Time Zone:</h1>
              <div className="flex items-center pl-10">
                <span className="text-red-500 text-lg pt-[3px]">*</span>
                <h1 className="text-primary font-medium">Note Source:</h1>
              </div>
            </div>

            <div className="flex gap-2  justify-center items-center">
              <div>
                <Space direction="vertical" size={12}>
                  <DatePicker
                    className="!bg-[#F2F2F2]"
                    popupClassName="date-ok-button"
                    value={isAddNoteData?.nextFollowUpDateTime}
                    showNow={false}
                    showTime
                    showSecond={false}
                    clearIcon={false}
                    onChange={(value: DatePickerProps["value"]) => {
                      console.log("onOk: ", value);
                    }}
                    onOk={(value: DatePickerProps["value"]) => {
                      setIsAddNoteData({
                        ...isAddNoteData,
                        nextFollowUpDateTime: value,
                      });
                    }}
                  />
                </Space>
              </div>
              <div>
                <Select
                  className="time-select"
                  defaultValue="IST"
                  value={isAddNoteData?.timezone || "CST"}
                  style={{ width: 120 }}
                  onChange={(value: string) => {
                    setIsAddNoteData({
                      ...isAddNoteData,
                      timezone: value,
                    });
                  }}
                  options={[
                    { value: "IST", label: "IST" },
                    { value: "HST", label: "HST" },
                    { value: "AKST", label: "AKST" },
                    { value: "PST", label: "PST" },
                    { value: "MST", label: "MST" },
                    { value: "CST", label: "CST" },
                    { value: "EST", label: "EST" },
                  ]}
                />
              </div>
              <div>
                <div className="flex gap-2">
                  <div className="text-center bg-[#F2F2F2] h-8 w-28 rounded-lg pl-4 flex justify-center items-center gap-2 border border-gray-300">
                    <Radio
                      id="incomingInp"
                      type="radio"
                      value={0}
                      name="IncomingOutgoing"
                      checked={isAddNoteData?.noteSource === 0 ? true : false}
                      onChange={() =>
                        setIsAddNoteData({ ...isAddNoteData, noteSource: 0 })
                      }
                      className="font-medium cursor-pointer"
                    >
                      Incoming
                    </Radio>
                  </div>

                  <div className="text-center  bg-[#F2F2F2] h-8 w-28 rounded-lg pl-4 flex justify-center items-center gap-2 border border-gray-300">
                    <Radio
                      checked={isAddNoteData?.noteSource === 1 ? true : false}
                      id="outgoingInp"
                      type="radio"
                      name="IncomingOutgoing"
                      onChange={() =>
                        setIsAddNoteData({ ...isAddNoteData, noteSource: 1 })
                      }
                      className="font-medium cursor-pointer"
                      value={1}
                    >
                      Outgoing
                    </Radio>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <div className="flex flex-col">
                <label htmlFor="" className="text-primary font-medium mb-3">
                  Change Standard Comment:
                </label>
                <Select
                  className="time-select"
                  defaultValue="Select"
                  value={isAddNoteData?.changeStandardComment}
                  showSearch
                  style={{ width: 260 }}
                  onChange={(value: string) => {
                    console.log(`selected ${value}`);
                    setIsAddNoteData({
                      ...isAddNoteData,
                      changeStandardComment: value,
                    });
                  }}
                  onSearch={(value: string) => {
                    console.log("search:", value);
                  }}
                  options={[
                    { value: "Follow-Up", label: "Follow-Up" },
                    {
                      value: "Follow-up on a specific Date/Time",
                      label: "Follow-up on a specific Date/Time",
                    },
                    { value: "Hung-up", label: "Hung-up" },
                    {
                      value: "Manager with Active Requirements",
                      label: "Manager with Active Requirements",
                    },
                    { value: "Connected Manager", label: "Connected Manager" },
                    { value: "Voicemail", label: "Voicemail" },
                    { value: "DND", label: "DND" },
                    {
                      value: "Number not in service",
                      label: "Number not in service",
                    },
                    {
                      value: "Wants to stick with standard Channel",
                      label: "Wants to stick with standard Channel",
                    },
                    { value: "Wrong Number", label: "Wrong Number" },
                    {
                      value: "Handles Offshore Requirements",
                      label: "Handles Offshore Requirements",
                    },
                    { value: "No number given", label: "No number given" },
                    {
                      value: "Not involved in hiring",
                      label: "Not involved in hiring",
                    },
                    { value: "Call Later", label: "Call Later" },
                    {
                      value: "Call is not going through",
                      label: "Call is not going through",
                    },
                    {
                      value: "No Longer with company",
                      label: "No Longer with company",
                    },
                    { value: "Reference", label: "Reference" },
                  ]}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-primary font-medium mb-3">
                  Label:
                </label>
                <Select
                  className="time-select"
                  showSearch
                  value={isAddNoteData?.labels}
                  mode="multiple"
                  style={{ width: 210 }}
                  optionFilterProp="children"
                  onChange={(value: string) => {
                    console.log(`selected ${value}`);
                    setIsAddNoteData({
                      ...isAddNoteData,
                      labels: value,
                    });
                  }}
                  onSearch={(value: string) => {
                    console.log("search:", value);
                  }}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "Follow-Up",
                      label: "Follow-Up",
                    },
                    {
                      value: "Email Follow-Up",
                      label: "Email Follow-Up",
                    },
                    {
                      value: "Submission",
                      label: "Submission",
                    },
                    {
                      value: "Interview Scheduled",
                      label: "Interview Scheduled",
                    },
                    {
                      value: "Interview Done",
                      label: "Interview Done",
                    },
                    {
                      value: "Introduction",
                      label: "Introduction",
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 absolute right-14 bottom-8">
            <Button
              loading={isLoaderSave}
              disabled={isLoaderSave}
              // onClick={handleSubmitNote}
              htmlType="submit"
              className="bg-primary h-8 w-20 rounded-xl text-white hover:!text-white hover:!bg-primary focus:!bg-primary"
            >
              Save
            </Button>
            <button
              className="bg-primary h-8 w-20 rounded-xl text-white"
              onClick={handleClearNotes}
            >
              Clear
            </button>
          </div>
        </form>
      </Modal>





      {/* Add Req Model */}
      <Modal
        width={551}
        className="contact-add-req-popup"
        centered={true}
        open={isAddReq}
        onOk={() => setIsAddReq(false)}
        onCancel={() => setIsAddReq(false)}
        footer={null}
        afterClose={() =>
          setIsAddNoteData({
            contactId: "",
            note: "",
            noteSource: "",
            nextFollowUpDateTime: "",
            timezone: "",
            labels: [],
            changeStandardComment: "",
          })
        }
      >

        <form onSubmit={handleSubmitRequirement}>
          {/* Header */}
          <div className="flex justify-between bg-[#121820] h-14 border-b items-center pl-5 pr-4 rounded-t-[10px]">
            <h1 className="text-xl text-white">
              Add Requirement For{" "}
              <span>
                {" "}
                ({" "}
                {location.pathname !== "/notification" ? (
                  <>{select.fullName}</>
                ) : (
                  <>{ele?.contactName} </>
                )}{" "}
                )
              </span>
            </h1>
            <span
              onClick={() => setIsAddReq(false)}
              className="text-2xl text-white cursor-pointer"
            >
              <AiOutlineClose />
            </span>
          </div>

          {/* Form Content */}
          <div className="flex flex-col gap-5 p-5">

            {/* Req Title & Rate */}
            <div className="flex gap-5">
              <div className="flex flex-col w-full">
                <label className="text-primary font-medium mb-1">
                  Req Title:
                </label>
                <input
                  required
                  type="text"
                  value={reqData.title}
                  onChange={(e) => setReqData({ ...reqData, title: e.target.value })}
                  className="bg-[#F2F2F2] pl-3 py-1 border border-gray-300 hover:border-black focus:border-black focus:outline-none rounded-lg"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-primary font-medium mb-1">Rate:</label>
                <input
                  type="text"
                  value={reqData.rate}
                  onChange={(e) => setReqData({ ...reqData, rate: e.target.value })}
                  className="bg-[#F2F2F2] pl-3 py-1 border border-gray-300 hover:border-black focus:border-black focus:outline-none rounded-lg"
                />
              </div>
            </div>


            {/* Visa Type */}
            <div className="flex flex-row w-full gap-5">
              <div className="flex flex-col w-[50%]">
                <label className="text-primary font-medium mb-1">Country:</label>
                <Select
                  className="time-select"
                  value={reqData.visa}
                  style={{ width: "100%" }}
                  onChange={(value) => setReqData({ ...reqData, visa: value })}
                  options={[
                    { value: "United State", label: "United State" }, 
                    { value: "India", label: "India" },
                  ]}
                />
              </div>
              <div className="flex flex-col w-[50%]">
                <label className="text-primary font-medium mb-1">State And City</label>
                <input
                  type="text"
                  value={reqData.rate}
                  onChange={(e) => setReqData({ ...reqData, rate: e.target.value })}
                  className="bg-[#F2F2F2] pl-3 py-1 border border-gray-300 hover:border-black focus:border-black focus:outline-none rounded-md"
                />

              </div>

            </div>

            {/* Location, Duration, Type */}
            <div className="flex gap-5">
              <div className="flex flex-col w-full">
                {/* <label className="text-primary font-medium mb-1">Location:</label>
                <Select
                  className="time-select"
                  value={reqData.location}
                  style={{ width: "100%" }}
                  onChange={(value) => setReqData({ ...reqData, location: value })}
                  options={[
                    { value: "Remote", label: "Remote" },
                    { value: "Onsite", label: "Onsite" },
                    { value: "Hybrid", label: "Hybrid" },
                  ]}
                /> */}

                <label className="text-primary font-medium mb-1">Accept Visa Type:</label>
                <Select
                  className="time-select"
                  value={reqData.visa}
                  style={{ width: "100%" }}
                  onChange={(value) => setReqData({ ...reqData, visa: value })}
                  options={[
                    { value: "USC/GC", label: "USC/GC" },
                    { value: "H1B", label: "H1B" },
                    { value: "OPT", label: "OPT" },
                    { value: "EAD", label: "EAD" },
                    { value: "Any", label: "Any" },
                  ]}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-primary font-medium mb-1">Duration:</label>
                <Select
                  className="time-select"
                  value={reqData.duration}
                  style={{ width: "100%" }}
                  onChange={(value) => setReqData({ ...reqData, duration: value })}
                  options={[
                    { value: "3 Months", label: "3 Months" },
                    { value: "6 Months", label: "6 Months" },
                    { value: "12 Months", label: "12 Months" },
                    { value: "Full Time", label: "Full Time" },
                  ]}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-primary font-medium mb-1">Type:</label>
                <Select
                  className="time-select"
                  value={reqData.type}
                  style={{ width: "100%" }}
                  onChange={(value) => setReqData({ ...reqData, type: value })}
                  options={[
                    { value: "OnSite", label: "OnSite" },
                    { value: "Hybrid", label: "Hybrid" },
                    { value: "Remote", label: "Remote" },
                  ]}
                />
              </div>
            </div>


            {/* Skills */}
            <div className="flex flex-col">
              <label className="text-primary font-medium mb-1">
                Skills:
              </label>
              <textarea
                required
                value={reqData.skills}
                onChange={(e) => setReqData({ ...reqData, skills: e.target.value })}
                className="bg-[#F2F2F2] pl-3 pt-1 resize-none hover:border-black focus:border-black border border-gray-300 focus:outline-none h-[125px] w-full rounded-md"
              />
            </div>

            {/* End Client & Partner */}
            <div className="flex gap-5">
              <div className="flex flex-col w-full">
                <label className="text-primary font-medium mb-1">End Client:</label>
                <input
                  type="text"
                  value={reqData.endClient}
                  onChange={(e) => setReqData({ ...reqData, endClient: e.target.value })}
                  className="bg-[#F2F2F2] pl-3 py-1 border border-gray-300 hover:border-black focus:border-black focus:outline-none rounded-md"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="text-primary font-medium mb-1">Implementation Partner:</label>
                <input
                  type="text"
                  value={reqData.partner}
                  onChange={(e) => setReqData({ ...reqData, partner: e.target.value })}
                  className="bg-[#F2F2F2] pl-3 py-1 border border-gray-300 hover:border-black focus:border-black focus:outline-none rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-3 justify-end pr-5 pb-5">
            <Button
              loading={isLoaderSave}
              disabled={isLoaderSave}
              htmlType="submit"
              className="bg-[#F57C00] h-9 w-24 rounded-md text-white hover:!text-white"
            >
              ADD
            </Button>

            <Button
              loading={isLoaderSave}
              disabled={isLoaderSave}
              htmlType="submit"
              className="bg-[#A4A5A5] h-9 w-24 rounded-md text-white hover:!text-white"
            >
              Clear
            </Button>
          </div>
        </form>


      </Modal>
    </>
  );
};

export default ContactAddNote;
