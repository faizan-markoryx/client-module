import { Modal, Space, Spin } from "antd";
import { useState } from "react";
import "../../styles/popUpStyle/ContactNamesDetails.css";
import { MdPersonPin } from "react-icons/md";
import { reportingManagerDataApi } from "../../services/contactAddNote";
import { RxCross1 } from "react-icons/rx";
import { AiFillLinkedin } from "react-icons/ai";
import { useLocation } from "react-router-dom";

const ReportingManagerData = ({ cell }: any) => {
  const [clientReportingManagerData, setClientReportingManagerData] =
    useState(false);
  const [managerdata, setManagerData]: any = useState({});
  const [isLoaderOnReportingManager, setIsLoaderOnReportingManager]: any =
    useState(false);
  const location = useLocation();

  const reportingManagerDataGet = () => {
    setIsLoaderOnReportingManager(true);
    const id: any =
      location.pathname === "/contacts"
        ? cell?.reportingManagerId
        : cell.contactId;
    reportingManagerDataApi(id).then((data: any) => {
      if (data.success) {
        setIsLoaderOnReportingManager(false);
        setManagerData(data?.data);
      }
    });
  };
  const reportingData = [
    {
      Header: "Contact ID	",
      accessor: "clientId",
    },
    {
      Header: "First Name	",
      accessor: "firstName",
    },
    {
      Header: "Last Name		",
      accessor: "lastName",
    },
    {
      Header: "Title		",
      accessor: "title",
    },

    {
      Header: "Contact Time Zone	",
      accessor: "contactTimeZone",
    },
    {
      Header: "Phone 1	",
      accessor: "phone1",
    },
    {
      Header: "Phone 2	",
      accessor: "phone2",
    },
    {
      Header: "Phone 3	",
      accessor: "phone3",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Alternate Email	",
      accessor: "alternateEmail",
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
      Header: "Unit",
      accessor: "unit",
    },
    {
      Header: "End Client	",
      accessor: "endClient",
    },
    {
      Header: "Skills Supported	",
      accessor: "skillsSupported",
    },
    {
      Header: "Standard Comments	",
      accessor: "standardComment",
    },
    {
      Header: "Lead Status	",
      accessor: "leadStatus",
    },
    {
      Header: "Lead Source	",
      accessor: "leadSource",
    },
    {
      Header: "LinkedIn Profile	",
      accessor: "linkedInProfile",
    },
  ];

  return (
    <>
      <div
        className="flex cursor-pointer w-full"
        onClick={() => {
          reportingManagerDataGet();
          setClientReportingManagerData(true);
        }}
      >
        {location.pathname === "/contacts" ? (
          <MdPersonPin className="min-w-[1rem] text-[22px] text-primary" />
        ) : null}

        <span className="w-full font-medium text-primary whitespace-nowrap overflow-hidden text-ellipsis text-sm">
          {location.pathname === "/contacts" ? (
            cell.reportingManager
          ) : (
            <span
              className={
                location.pathname == "/notification"
                  ? "text-[16px] font-semibold"
                  : ""
              }
            >
              ( {cell.contactName} )
            </span>
          )}
        </span>
      </div>

      <Modal
        wrapClassName="contact-firstname-data-modal"
        open={clientReportingManagerData}
        footer={null}
        width={"50%"}
        onOk={() => setClientReportingManagerData(false)}
        onCancel={() => setClientReportingManagerData(false)}
      >
        <div className="contsact-name-header-main-div">
          <div className="flex justify-center">
            <div className="contsact-name-header flex flex-col">
              <span className="whitespace-nowrap text-center w-full overflow-hidden px-4">
                {location.pathname === "/contacts"
                  ? cell?.reportingManager
                  : cell.contactName}
              </span>
              <span className="whitespace-nowrap text-gray-300 text-center w-full overflow-hidden text-xs">
                {location.pathname === "/contact"
                  ? "(Reporting Manager Details)"
                  : "(Contact Details)"}
                <div>
                  <RxCross1
                    className="cursor-pointer text-[25px] absolute right-[1rem] top-4 text-primary"
                    onClick={() => setClientReportingManagerData(false)}
                  />
                </div>
              </span>
            </div>
          </div>
        </div>

        <div className="contact-name-map">
          {isLoaderOnReportingManager ? (
            <Space size="middle">
              <Spin size="large" className="absolute right-1/2 top-1/2" />
            </Space>
          ) : (
            <>
              {reportingData?.map((res: any, index: any) => {
                return (
                  <div className="contact-name-map-main-div" key={index}>
                    <div className="contact-name-header">{res?.Header}</div>
                    <div className="contact-name-dot ">:</div>

                    {managerdata?.[res.accessor] !== "" &&
                    managerdata?.[res.accessor] !== null ? (
                      <div className="contact-name-accessor">
                        {res.accessor === "linkedInProfile" ? (
                          <a
                            href={managerdata?.[res.accessor]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary text-2xl"
                          >
                            <AiFillLinkedin className="text-primary text-3xl rounded-full" />
                          </a>
                        ) : (
                          <>{managerdata?.[res.accessor]}</>
                        )}
                      </div>
                    ) : (
                      <div className="contect-name-blank-condition ">--</div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ReportingManagerData;
