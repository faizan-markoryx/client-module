import "../../styles/contact/contactBulkActionPopUp.css";
// import DataTransfer from "../../assets/data-transfer.svg";
import { useEffect, useRef, useState } from "react";
import { Modal, Select, message, Button } from "antd";
import * as XLSX from "xlsx";
import { AiOutlineDownload } from "react-icons/ai";
import { userList } from "../../services/userServices";
import {
  contactBulkChangeOwner,
  contactBulkDelete,
} from "../../services/contactServices";
import DataTransferSvg from "../../assets/DataTransferSvg";

const ContactBulkActionPopUp = () => {
  const [isBulkActionOpenModal, setIsBulkActionOpenModal]: any =
    useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [userListData, setUserListData] = useState([]);
  const [excelFileOwner, setExcelFileOwner]: any = useState(null);
  const [excelFileDelete, setExcelFileDelete]: any = useState(null);
  const [ownerLoader, setOwnerLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const inputRef1: any = useRef(null);
  const inputRef2: any = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (isBulkActionOpenModal) {
      userList()
        .then((res: any) => {
          if (res.success) {
            setUserListData(res.data);
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }, [isBulkActionOpenModal]);

  const onChange = (value: string) => {
    setSelectedUser(value);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const handleFileOwner = (e: any) => {
    const fileType: any = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e: any) => {
          setExcelFileOwner(e.target.result);
        };
      } else {
        setExcelFileOwner(null);
      }
    }
  };

  const handleFileDelete = (e: any) => {
    const fileType: any = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e: any) => {
          setExcelFileDelete(e.target.result);
        };
      } else {
        setExcelFileDelete(null);
      }
    }
  };

  const handleSubmit = () => {
    if (excelFileOwner !== null) {
      setOwnerLoader(true);
      const workbook: any = XLSX.read(excelFileOwner, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data: any = XLSX.utils.sheet_to_json(worksheet);
      const newData = data.map((e: any) => e.email);
      const Body = {
        email: newData,
        ownershipId: selectedUser,
      };
      contactBulkChangeOwner(Body)
        .then((res: any) => {
          if (res.success) {
            setTimeout(() => {
              setOwnerLoader(false);
            }, 500);
            setSelectedUser("");
            setExcelFileOwner(null);
            inputRef1.current.value = null;
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      messageApi.open({
        type: "error",
        content: "Please Select a file!",
      });
    }
  };

  const handleSubmitDelete = () => {
    if (excelFileDelete !== null) {
      setDeleteLoader(true);
      const workbook: any = XLSX.read(excelFileDelete, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data: any = XLSX.utils.sheet_to_json(worksheet);
      const newData = data.map((e: any) => e.email);
      const Body = {
        email: newData,
      };
      contactBulkDelete(Body).then((res: any) => {
        if (res.success) {
          setTimeout(() => {
            setDeleteLoader(false);
          }, 500);

          inputRef2.current.value = null;
        }
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Please Select a file!",
      });
    }
  };

  return (
    <>
      {contextHolder}

      <DataTransferSvg
        className="bulk-transfer-icon"
        onClick={() => setIsBulkActionOpenModal(true)}
      />
      <Modal
        className="contact-bulk-action-open-popup"
        open={isBulkActionOpenModal}
        onOk={() => setIsBulkActionOpenModal(false)}
        onCancel={() => setIsBulkActionOpenModal(false)}
        footer={null}
      >
        <div className="contact-bulk-head-division">
          <p className="bulk-header-action">Bulk Action</p>
        </div>
        <hr />
        <div className="bulk-second-division">
          <div className="bulk-transfer-section">
            <div className="bulk-long-sec">
              <h5>Bulk Transfer</h5>
            </div>
            <div className="download-excel-file-section">
              <div>
                <input
                  ref={inputRef1}
                  type="file"
                  id="fileSelect"
                  required
                  onChange={(e: any) => handleFileOwner(e)}
                />
              </div>
              <div>
                <a href="/template/bulk-ownership-delete-template.xlsx">
                  <div className="excel-template-file">
                    <p className="download-word-tem">Download Excel Template</p>
                    <AiOutlineDownload className="download-icon" />
                  </div>
                </a>
              </div>
            </div>
            <div className="owner-ship-division">
              <label htmlFor="" className="font-medium">
                <span className="owner-star-section"> * </span>
                Ownership :
              </label>
              <Select
                showSearch
                optionFilterProp="children"
                value={selectedUser}
                className="bulk-select-section"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input: any, option: any) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={userListData.map((e: any) => ({
                  value: e.id,
                  label: e.fullName,
                }))}
              />
            </div>
            <div className="bulk-submit-sec">
              <Button
                loading={ownerLoader}
                onClick={() => handleSubmit()}
                className="submit-btn-click flex justify-center items-center"
              >
                Submit
              </Button>
            </div>
            <div className="bulk-transfer-last-division">
              <div className="bulk-delete-section">
                <p>Bulk Delete</p>
              </div>
              <div className="bulk-delete-owner-email">
                <div className="label-or-download-section">
                  <div>
                    <label htmlFor="" className="owner-email-label">
                      <span className="label-small-star"> * </span>
                      Owner Email :
                    </label>
                  </div>
                  <div>
                    <a href="/template/bulk-ownership-delete-template.xlsx">
                      <div className="owner-email-download-template">
                        <p className="download-excel-owner-email">
                          Download Excel Template
                        </p>
                        <AiOutlineDownload className="text-xl text-primary" />
                      </div>
                    </a>
                  </div>
                </div>

                <div>
                  <input
                    ref={inputRef2}
                    type="file"
                    id="fileSelect"
                    required
                    onChange={(e: any) => handleFileDelete(e)}
                  />
                </div>
              </div>
              <div className="delete-btn-section">
                <Button
                  loading={deleteLoader}
                  onClick={handleSubmitDelete}
                  className="bulk-delete-btn-click flex justify-center items-center"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ContactBulkActionPopUp;
