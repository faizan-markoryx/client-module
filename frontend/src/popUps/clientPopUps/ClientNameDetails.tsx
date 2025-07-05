import { Modal, Space, Spin } from "antd";
import { useState } from "react";
import "../../styles/ClientNameDetails.css";
import { AiFillFile } from "react-icons/ai";
import moment from "moment";
import { RxCross1 } from "react-icons/rx";

const ClientNameDetails = ({ cell }: any) => {
  const [clientFirstNameDetails, setClientFirstNameDetails] = useState(false);

  const showClientNameDetails = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Client Name",
      accessor: "clientName",
    },
    {
      Header: "WebsiteUrl",
      accessor: "websiteUrl",
    },
    {
      Header: "Category",
      accessor: "category",
    },
    {
      Header: "Industry",
      accessor: "industry",
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
      accessor: "clientNotesData",
    },
    {
      Header: "PaymentTerm",
      accessor: "paymentTerm",
    },
    {
      Header: "ClientStatus",
      accessor: "clientStatus",
    },

    {
      Header: "Ownership",
      accessor: "ownership",
    },
    {
      Header: "CreatedBy",
      accessor: "createdBy",
    },
    {
      Header: "UpdatedBy",
      accessor: "updatedBy",
    },
    {
      Header: "CreatedAt",
      accessor: "createdAt",
    },
    {
      Header: "UpdatedAt",
      accessor: "updatedAt",
    },
  ];

  return (
    <div className="w-[20px] font-mulish">
      <AiFillFile
        className="cursor-pointer text-[14px]"
        onClick={() => {
          setClientFirstNameDetails(true);
        }}
      />
      <Modal
        wrapClassName="contact-firstname-data-modal"
        open={clientFirstNameDetails}
        footer={null}
        width={"50%"}
        onOk={() => setClientFirstNameDetails(false)}
        onCancel={() => setClientFirstNameDetails(false)}
      >
        <div className="contsact-name-header-main-div ">
          <div className="flex justify-center">
            <div className="contsact-name-header flex flex-col">
              <span className="whitespace-nowrap text-center w-full overflow-hidden px-4">
                {cell?.clientName}
              </span>
              <span className="whitespace-nowrap text-gray-300 text-center w-full overflow-hidden text-xs">
                (Client Details)
              </span>
              <div>
                <RxCross1
                  className="cursor-pointer text-[25px] absolute  right-[1rem] top-4 text-primary"
                  onClick={() => setClientFirstNameDetails(false)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="contact-name-map">
          {cell ? (
            <>
              {showClientNameDetails.map((res: any, index: any) => {
                return (
                  <>
                    <div className="contact-name-map-main-div  " key={index}>
                      <div className="contact-name-header">{res?.Header}</div>
                      <div className="contact-name-dot ">:</div>
                      {cell?.[res?.accessor] !== "" &&
                        cell?.[res?.accessor] !== null ? (
                        <div className="contact-name-accessor ">
                          {res?.accessor === "createdAt" ||
                            res?.accessor === "updatedAt"
                            ? `${moment(cell?.[res?.accessor])
                              .tz("America/Chicago")
                              .format("Do MMM YYYY, h:mm A")}(CST)`
                            : cell?.[res?.accessor]}
                        </div>
                      ) : (
                        <div className="contect-name-blank-condition ">--</div>
                      )}
                    </div>
                  </>
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
  );
};

export default ClientNameDetails;
