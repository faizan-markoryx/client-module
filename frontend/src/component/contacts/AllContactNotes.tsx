import { Modal, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../../styles/popUpStyle/AllContactNotes.css";
import { getNotesAPI } from "../../services/contactAddNote";
import { useDispatch, useSelector } from "react-redux";
import ContactAddNote from "./ContactAddNote";
import {
  setContactRefresh,
  setContactTableNoteData,
} from "../../redux/contactSlice";
import EditContactNote from "./EditContactNote";
import { MdNote } from "react-icons/md";
import { flexRender } from "@tanstack/react-table";
import moment from "moment";
import DeleteNotePopup from "../../popUps/clientPopUps/DeleteNotePopup";

const AllContactNotes = ({ row, cell }: any) => {
  const [isModalOpen, setIsModalOpen]: any = useState(false);
  const [isLoaderOnNote, setIsLoaderOnNote]: any = useState(false);
  const [createdNoteAllData, setCreatedNoteAllData] = useState([]);
  const [editAndDeleteAPIVal, setEditAndDeleteAPIVal]: any = useState(false);

  const select = useSelector((state: any) => state?.contact?.noteRefresh);
  const createNoteId = row.original;

  const dispatch = useDispatch();

  const tableHead = [
    {
      name: "No",
    },
    {
      name: "Notes",
    },
    {
      name: "Last Follow-up date",
    },
    {
      name: "Next Follow-up date",
    },
    {
      name: "Labels",
    },
    // {
    //   name: "TimeZone",
    // },
    {
      name: "Created At",
    },
    {
      name: "Created By",
    },
    {
      name: "Updated By",
    },
    {
      name: "Action",
    },
  ];

  useEffect(() => {
    setIsLoaderOnNote(true);
    if (createNoteId?.id && isModalOpen) {
      getNotesAPI(createNoteId?.id)
        .then((res: any) => {
          if (res.success) {
            setIsLoaderOnNote(false);
            setCreatedNoteAllData(res?.data);
          } else {
            setIsLoaderOnNote(false);
          }
        })
        .catch(() => {
          setIsLoaderOnNote(false);
        });
    }
  }, [isModalOpen, select]);

  const myNotes = (data: any) => {
    dispatch(setContactTableNoteData(data));
  };

  const contactNoteCancelFun = () => {
    if (editAndDeleteAPIVal) {
      dispatch(setContactRefresh());
    }
  };

  return (
    <>
      <span
        className="flex text-primary items-center gap-1 pt-6 w-full h-[45.3px] "
        onClick={() => {
          myNotes(row?.original);
          setIsModalOpen(true);
        }}
      >
        <MdNote
          className="cursor-pointer min-w-[1rem]"
          onClick={() => setIsModalOpen(true)}
        />
        <span
          style={{
            display: "block",
            // maxWidth: "120px",
            whiteSpace: "nowrap",
            maxHeight: "20px",
            cursor: "pointer",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </span>
      </span>
      <Modal
        width={1300}
        className="AllContactNotes"
        open={isModalOpen}
        footer={null}
        centered={true}
      >
        <div className="all-notes-heading">
          <div></div>
          <div>
            <h1 className="text-xl text-white font-medium">
              All Contact Notes Of ( {createNoteId?.firstName}{" "}
              {createNoteId?.lastName} )
            </h1>
          </div>
          <div>
            <span
              className="text-2xl text-primary cursor-pointer"
              onClick={() => {
                setIsModalOpen(false);
                contactNoteCancelFun();
              }}
            >
              <AiOutlineClose className="mr-5 text-white" />
            </span>
          </div>
        </div>
        {isLoaderOnNote ? (
          <div className="main-section-of-all-note-table">
            <Space size="middle">
              <Spin size="large" className="absolute right-1/2 top-1/2" />
            </Space>
          </div>
        ) : (
          <div>
            <div className="main-section-of-all-note-table">
              <table className="w-full">
                <thead className="sticky top-0 bg-white">
                  <tr className="table-tr-sec">
                    {tableHead?.map((e: any, index: any) => {
                      if (e.name === "No") {
                        return (
                          <>
                            <th
                              key={index}
                              className="w-[80px] pl-2 pr-2 pt-3 text-sm text-primary text-left"
                            >
                              {e?.name}
                            </th>
                          </>
                        );
                      } else if (e.name === "Notes") {
                        return (
                          <>
                            <th key={index} className="w-[200px] pl-2 pr-2 text-left pt-3 text-sm text-primary ">
                              {e?.name}
                            </th>
                          </>
                        );
                      } else {
                        return (
                          <>
                            <th key={index} className="table-th-sec">
                              {e?.name}
                            </th>
                          </>
                        );
                      }
                    })}
                  </tr>
                </thead>
                <tbody className="w-full h-full">
                  {createdNoteAllData?.map((ele: any, index: any) => {
                    return (
                      <tr
                        key={index}
                        className=" pt-3 pb-3 border-b-2 gap-[8.7px]"
                      >
                        <td className="p-2 font-medium text-sm  ">
                          {ele?.id}
                        </td>
                        <td className="p-2 font-medium text-sm max-w-[250px] overflow-hidden leading-5">
                          {ele?.note}
                        </td>
                        <td className=" p-2 font-medium text-sm ">

                          {ele?.updatedAt !== "" &&
                            ele?.updatedAt !== null
                            ?
                            <>
                              {
                                moment(ele?.updatedAt).tz("America/Chicago").format(
                                  "Do MMM YYYY, h:mm A")
                              } <span>(CST)</span>
                            </> : "--"}

                        </td>

                        <td className=" p-2 font-medium text-sm ">
                          {ele?.nextFollowUpDateTime !== "" &&
                            ele?.nextFollowUpDateTime !== null
                            ?
                            <>
                              {
                                moment(ele?.nextFollowUpDateTime).format(
                                  "Do MMM YYYY, h:mm A"
                                )
                              }<span> ({ele?.timezone})</span></>
                            : "--"}
                        </td>

                        <td className=" p-2 flex flex-col gap-2 ">
                          {ele?.contactNoteLabels?.map((label: any) => {
                            if (label === "Interview Scheduled") {
                              return (
                                <span className="text-xs w-fit whitespace-nowrap pl-[2px] pr-[2px] h-7 flex justify-center items-center cursor-default bg-[#73C883] rounded-lg text-white">
                                  {label}
                                </span>
                              );
                            } else if (label === "Email Follow-Up") {
                              return (
                                <span className="text-xs w-fit cursor-default bg-[#B399D4] p-1 rounded-lg text-white">
                                  {label}
                                </span>
                              );
                            } else if (label === "Follow-up") {
                              return (
                                <span className="text-xs cursor-default w-fit bg-[#FF7B7B] p-1 rounded-lg text-white">
                                  {label}
                                </span>
                              );
                            } else if (label === "Interview Done") {
                              return (
                                <span className="text-xs cursor-default w-fit bg-[#88A38B] p-1 rounded-lg text-white">
                                  {label}
                                </span>
                              );
                            } else if (label === "Submission") {
                              return (
                                <span className="text-xs cursor-default w-fit bg-[#F79862] p-1 rounded-lg text-white">
                                  {label}
                                </span>
                              );
                            } else if (label === "Introduction") {
                              return (
                                <span className="text-xs cursor-default w-fit bg-[#49AFEA] p-1 rounded-lg text-white">
                                  {label}
                                </span>
                              );
                            }
                          })}

                          {ele?.noteSource == 0 ? (
                            <span className="bg-[#1DA518] w-fit  text-xs cursor-default p-1 rounded-lg text-white">
                              Incoming
                            </span>
                          ) : (
                            <span className="bg-[#F91D1D] w-fit text-xs cursor-default p-1 rounded-lg text-white">
                              Outgoing
                            </span>
                          )}
                        </td>

                        <td className=" text-sm font-medium p-2 ">
                          {ele?.createdAt !== "" &&
                            ele?.createdAt !== null
                            ?
                            <>
                              {
                                moment(ele?.createdAt).tz("America/Chicago").format(
                                  "Do MMM YYYY, h:mm A")
                              } <span>(CST)</span>
                            </> : "--"}
                        </td>



                        <td className="text-sm font-medium p-2 whitespace-nowrap">
                          {ele?.createdBy}
                        </td>
                        <td className=" text-sm font-medium p-2 whitespace-nowrap">
                          {ele?.updatedBy}
                        </td>
                        <td className="w-[137px] text-sm font-medium pl-2  text-primary">
                          <span className="flex justify-start items-left w-full">
                            <EditContactNote
                              editNoteData={ele}
                              setEditAndDeleteAPIVal={setEditAndDeleteAPIVal}
                            />
                            <DeleteNotePopup
                              deleteNoteData={ele}
                              setEditAndDeleteAPIVal={setEditAndDeleteAPIVal}
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="add-more-but-sec">
              <ContactAddNote />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default AllContactNotes;
