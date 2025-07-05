import { Modal, Space, Spin } from "antd";
import { useState } from "react";
import "../../styles/popUpStyle/ContactNamesDetails.css";
import { AiFillLinkedin } from "react-icons/ai";
import moment from "moment";
import { RxCross1 } from "react-icons/rx";
import ReportingManagerData from "./ReportingManagerData";
import AddContactPopUp from "../AddContactPopUp";

const ContactNamesDetails = ({ cell }: any) => {
  const [clientFirstNameData, setClientFirstNameData] = useState(false);
  const showClientNameData: any = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Client Name",
      accessor: "clientName",
    },
    {
      Header: "Full Name",
      accessor: "fullName",
    },
    {
      Header: "First Name",
      accessor: "firstName",
    },
    {
      Header: "Last Name",
      accessor: "lastName",
    },
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "City",
      accessor: "city",
    },
    {
      Header: "State",
      accessor: "state",
    },
    {
      Header: "Country",
      accessor: "country",
    },
    {
      Header: "Notes",
      accessor: "contactNote",
    },
    {
      Header: "Reporting Manager",
      accessor: "reportingManager",
    },
    {
      Header: "Next Follow-up date",
      accessor: "nextFollowUpDateTime",
    },
    {
      Header: "Last Follow-up date",
      accessor: "lastFollowUpDate",
    },
    {
      Header: "Contact Time Zone",
      accessor: "contactTimeZone",
    },
    {
      Header: "Phone 1",
      accessor: "phone1",
    },
    {
      Header: "Phone 2",
      accessor: "phone2",
    },
    {
      Header: "Phone 3",
      accessor: "phone3",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Alternate Email",
      accessor: "alternateEmail",
    },
    {
      Header: "Unit",
      accessor: "unit",
    },
    {
      Header: "End Client",
      accessor: "endClient",
    },
    {
      Header: "Skills Supported",
      accessor: "email",
    },
    {
      Header: "Standard Comments",
      accessor: "skillsSupported",
    },
    {
      Header: "Lead Status",
      accessor: "leadStatus",
    },
    {
      Header: "Lead Source",
      accessor: "leadSource",
    },
    {
      Header: "LinkedIn Profile",
      accessor: "linkedInProfile",
    },
    {
      Header: "Ownership",
      accessor: "ownership",
    },
    {
      Header: "Created At",
      accessor: "createdAt",
    },
    {
      Header: "Updated At",
      accessor: "updatedAt",
    },
    {
      Header: "Created By",
      accessor: "createdBy",
    },
  ];

  return (
    <>
      <div>
        {/* <AiFillFile
          className="cursor-pointer text-[14px]"
          onClick={() => {
            setClientFirstNameData(true);
          }}
        /> */}
        <Modal
          wrapClassName="contact-firstname-data-modal"
          open={clientFirstNameData}
          footer={null}
          width={"50%"}
          onOk={() => setClientFirstNameData(false)}
          onCancel={() => setClientFirstNameData(false)}
        >
          <div className="contsact-name-header-main-div ">
            <div className="flex justify-center">
              <div className="contsact-name-header flex flex-col">
                <span className="whitespace-nowrap text-center w-full overflow-hidden px-4">
                  {cell?.fullName}
                </span>
                <span className="whitespace-nowrap text-gray-300 text-center w-full overflow-hidden text-xs">
                  (Contact Details)
                </span>
                <div>
                  <RxCross1
                    className="cursor-pointer text-[25px] absolute right-[1rem] top-4 text-primary"
                    onClick={() => setClientFirstNameData(false)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="contact-name-map">
            {cell ? (
              <>
                {showClientNameData.map((res: any, index: any) => {
                  return (
                    <div className="contact-name-map-main-div" key={index}>
                      <div className="contact-name-header">{res?.Header}</div>
                      <div className="contact-name-dot ">:</div>
                      {cell?.[res?.accessor] !== "" &&
                        cell?.[res?.accessor] !== null ? (
                        res?.Header === "Reporting Manager" ? (
                          <div className="contact-name-accessor">
                            <ReportingManagerData cell={cell} />
                          </div>
                        ) : (
                          <div className="contact-name-accessor">
                            {res?.accessor === "createdAt" ||
                              res?.accessor === "updatedAt" ? (
                              <>
                                {
                                  moment(cell?.[res?.accessor]).tz("America/Chicago").format(
                                    "Do MMM YYYY, h:mm A")
                                } <span>(CST)</span></>

                            ) : res.accessor === "linkedInProfile" ? (
                              <a
                                href={cell?.[res.accessor]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary text-2xl"
                              >
                                <AiFillLinkedin className="text-primary text-3xl rounded-full" />
                              </a>
                            ) : (
                              cell?.[res?.accessor]
                            )}
                          </div>
                        )
                      ) : (
                        <div className="contect-name-blank-condition ">--</div>
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <Space size="middle">
                <Spin size="large" className="absolute right-1/2 top-1/2" />
              </Space>
            )}
          </div>
        </Modal>
      </div>
      <div className="flex">

        <span
          className="max-w-[150px] overflow-hidden text-ellipsis cursor-pointer"
          onClick={() => setClientFirstNameData(true)}
        >
          {cell.fullName}
        </span>
        <AddContactPopUp cell={cell} />
      </div>
    </>
  );
};

export default ContactNamesDetails;
