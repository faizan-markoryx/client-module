import { Modal, Button, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { TfiExchangeVertical } from "react-icons/tfi";
import exportFromJSON from "export-from-json";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import Http from "../../services/http";
import { AiOutlineDownload } from "react-icons/ai";
import ClientExportLoader from "../../popUps/clientPopUps/ClientExportLoader";

const ClientExport = () => {
  const { contactData, selectedIds }: any = useSelector(
    (state: any) => state.contact
  );
  // const { userData }: any = useSelector((state: any) => state.user);
  const [openExportModel, setOpenExportModel]: any = useState(false);
  const [exportLoader, setExportLoader] = useState(false);
  const [filesName, setFilesName]: any = useState("");
  const [importError, setImportError]: any = useState([]);
  const [contactColumns, setContactColumns]: any = useState([
    {
      accessorKey: "id",
      header: "ID",
      isSelected: false,
    },
    {
      accessorKey: "clientName",
      header: "Client Name",
      isSelected: false,
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      isSelected: false,
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      isSelected: false,
    },
    {
      accessorKey: "title",
      header: "Title",
      isSelected: false,
    },
    {
      accessorKey: "city",
      header: "City",
      isSelected: false,
    },
    {
      accessorKey: "state",
      header: "State",
      isSelected: false,
    },
    {
      accessorKey: "country",
      header: "Country",
      isSelected: false,
    },
    {
      accessorKey: "contactNote",
      header: "Notes",
      isSelected: false,
    },

    {
      accessorKey: "reportingManager",
      header: "Reporting Manager",
      isSelected: false,
    },
    {
      accessorKey: "nextfollowUpdate",
      header: "Next Follow-up date",
      isSelected: false,
    },
    {
      accessorKey: "lastfollowUpdate",
      header: "Last Follow-up date",
      isSelected: false,
    },
    {
      accessorKey: "contactTimeZone",
      header: "Contact Time Zone",
      isSelected: false,
    },
    {
      accessorKey: "phone1",
      header: "Phone 1",
      isSelected: false,
    },
    {
      accessorKey: "phone2",
      header: "Phone 2",
      isSelected: false,
    },
    {
      accessorKey: "phone3",
      header: "Phone 3",
      isSelected: false,
    },
    {
      accessorKey: "email",
      header: "Email",
      isSelected: false,
    },
    {
      accessorKey: "alternateEmail",
      header: "Alternate Email",
      isSelected: false,
    },
    {
      accessorKey: "unit",
      header: "Unit",
      isSelected: false,
    },
    {
      accessorKey: "endClient",
      header: "End Client",
      isSelected: false,
    },
    {
      accessorKey: "skillsSupported",
      header: "Skills Supported",
      isSelected: false,
    },
    {
      accessorKey: "standardComment",
      header: "Standard Comments",
      isSelected: false,
    },
    {
      accessorKey: "leadStatus",
      header: "Lead Status",
      isSelected: false,
    },
    {
      accessorKey: "leadSource",
      header: "Lead Source",
      isSelected: false,
    },
    {
      accessorKey: "linkedInProfile",
      header: "LinkedIn Profile",
      isSelected: false,
    },
    {
      accessorKey: "ownership",
      header: "Ownership",
      isSelected: false,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      isSelected: false,
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      isSelected: false,
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
      isSelected: false,
    },
  ]);
  const [excelFile, setExcelFile]: any = useState(null);
  const [isExportingOpen, setIsExportingOpen]:any = useState(false);
  const [isExportAndImport, setIsExportAndImport]: any = useState(false);
  const [openImportModel, setOpenImportModel]: any = useState(false);
  const importRef: any = useRef();
  const inputRef: any = useRef(null)


  const handleClickOutside = (event: any) => {
    if (importRef.current && !importRef.current.contains(event.target)) {
      setIsExportAndImport(false);
    }
  };

  const clearColumn = () => {
    setContactColumns([
      {
        accessorKey: "id",
        header: "ID",
        isSelected: false,
      },
      {
        accessorKey: "clientName",
        header: "Client Name",
        isSelected: false,
      },
      {
        accessorKey: "firstName",
        header: "First Name",
        isSelected: false,
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        isSelected: false,
      },
      {
        accessorKey: "title",
        header: "Title",
        isSelected: false,
      },
      {
        accessorKey: "city",
        header: "City",
        isSelected: false,
      },
      {
        accessorKey: "state",
        header: "State",
        isSelected: false,
      },
      {
        accessorKey: "country",
        header: "Country",
        isSelected: false,
      },
      {
        accessorKey: "contactNote",
        header: "Notes",
        isSelected: false,
      },

      {
        accessorKey: "reportingManager",
        header: "Reporting Manager",
        isSelected: false,
      },
      {
        accessorKey: "nextfollowUpdate",
        header: "Next Follow-up date",
        isSelected: false,
      },
      {
        accessorKey: "lastfollowUpdate",
        header: "Last Follow-up date",
        isSelected: false,
      },
      {
        accessorKey: "contactTimeZone",
        header: "Contact Time Zone",
        isSelected: false,
      },
      {
        accessorKey: "phone1",
        header: "Phone 1",
        isSelected: false,
      },
      {
        accessorKey: "phone2",
        header: "Phone 2",
        isSelected: false,
      },
      {
        accessorKey: "phone3",
        header: "Phone 3",
        isSelected: false,
      },
      {
        accessorKey: "email",
        header: "Email",
        isSelected: false,
      },
      {
        accessorKey: "alternateEmail",
        header: "Alternate Email",
        isSelected: false,
      },
      {
        accessorKey: "unit",
        header: "Unit",
        isSelected: false,
      },
      {
        accessorKey: "endClient",
        header: "End Client",
        isSelected: false,
      },
      {
        accessorKey: "skillsSupported",
        header: "Skills Supported",
        isSelected: false,
      },
      {
        accessorKey: "standardComment",
        header: "Standard Comments",
        isSelected: false,
      },
      {
        accessorKey: "leadStatus",
        header: "Lead Status",
        isSelected: false,
      },
      {
        accessorKey: "leadSource",
        header: "Lead Source",
        isSelected: false,
      },
      {
        accessorKey: "linkedInProfile",
        header: "LinkedIn Profile",
        isSelected: false,
      },
      {
        accessorKey: "ownership",
        header: "Ownership",
        isSelected: false,
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        isSelected: false,
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        isSelected: false,
      },
      {
        accessorKey: "createdBy",
        header: "Created By",
        isSelected: false,
      },
    ]);
  }

  useEffect(() => {
    if (!openExportModel) {
      clearColumn()
    }
  }, [openExportModel])

  useEffect(() => {
    if (!openImportModel) return;
    setImportError([]);
    setExcelFile(null);
    setFilesName("");
    inputRef.current.value = null;
  }, [openImportModel])
  

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);


  const handleFile = (e: any) => {
    const fileType = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFilesName(e.target.files[0].name);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e: any) => {
          setExcelFile(e.target.result);
          
        };
      } else {
        setExcelFile(null);
      }
    }
  };

  const handleSubmit = async () => {
    if (excelFile !== null) {
      const workbook: any = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data: any = XLSX.utils.sheet_to_json(worksheet);
      if(data?.length <= 3000){
        setIsExportingOpen(true);
        const finalData: any = data?.map((e: any) => ({
          ...e,
          
        }));
        if (finalData.length > 0) {          
          await Http.post("contact/import-contact", finalData, false)
            .then((res: any) => {
              if (res.success) {
                setOpenImportModel(false);
                inputRef.current.value = null;
                setIsExportingOpen(false);
              } else {
                // console.log("res.errors", res.errors);                
                setImportError(res.errors);
                inputRef.current.value = null;
              }
            })
            .catch((err: any) => {
              console.log("err", err);
            });
        } else {
          message.warning("Please add some data in file.");
        }
      }else{
        message.warning("You can add only 3000 data at a time.");
      }          
    }
  };

  const selectExportColumn = (ele: any) => {
    const newColumnArr: any = [];
    contactColumns?.map((e: any) => {
      if (e?.accessorKey === ele.target.value) {
        e.isSelected = !e.isSelected;
        newColumnArr.push(e);
      } else {
        newColumnArr.push(e);
      }
      setContactColumns(newColumnArr);
    });
  };


  const selectAllColumn: any = (ele: any) => {

    const newClomnArr: any = [];
    contactColumns?.map((e: any) => {
      if (ele.target.checked) {
        if (!e.isSelected) {
          e.isSelected = true;
        } else if (e.isSelected) {
          e.isSelected = true;
        }
      } else if (!ele.target.checked) {
        if (e.isSelected) {
          e.isSelected = false;
        } else if (!e.isSelected) {
          e.isSelected = true;
        }
      }
      newClomnArr.push(e);
    });
    setContactColumns(newClomnArr);

  };

  const exportToExcel = async () => {
    setExportLoader(true);
    const body: any = {
      ...contactData,
      id: selectedIds.length > 0 ? selectedIds : [],
      isExport: true,
    };
    await Http.post("contact/all-in-one-contact-search", body, false)
      .then((res: any) => {
        if (res?.success) {
          const date = new Date();
          const dateName = `ContactData_${date.getDate()}-${date.getMonth()}-${date.getFullYear()}/time_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
          const fileName = dateName;
          const exportType = "csv";
          const FilterData = res?.data?.data?.map((e: any) => {
            let obj: any = {};
            contactColumns?.map((item: any) => {
              if (item.isSelected) {
                return (obj = { ...obj, [item.header]: e[item.accessorKey] !== null ? e[item.accessorKey] : "" });
              }
            });
            return obj;
          });
          const data = FilterData;

          if (data?.length !== 0) {
            exportFromJSON({ data, fileName, exportType });
          }
          setOpenExportModel(false);
          clearColumn()
          setExportLoader(false);
        }
      })
      .catch((err: any) => {
        // setExportLoader(false);
        console.log("err", err);

      });
  };

  return (
    <>
      <div
        className="client-head-export relative h-full w-[30px] mt-4 flex-col cursor-pointer"
        ref={importRef}
      >
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setIsExportAndImport(!isExportAndImport)}
        >
          <div className="w-full flex justify-center items-center ">
            <TfiExchangeVertical
              className={`text-[#A4A5A5] hover:text-primary`}
              size={27}
            />
          </div>
        </div>
        {isExportAndImport && (
          <div
            style={{
              height: "70px",
              width: "90px",
              backgroundColor: "white",
              borderRadius: "10px",
              position: "absolute",
              top: "40px",
              zIndex: "10",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 0px 6px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <button
              style={{ marginBottom: "5px" }}
              onClick={() => setOpenImportModel(true)}
            >
              Import
            </button>
            <button onClick={() => setOpenExportModel(true)}>Export</button>
          </div>
        )}
      </div>

      <Modal
        centered
        className="import-model"
        open={openImportModel}
        onOk={() => setOpenImportModel(false)}
        onCancel={() => setOpenImportModel(false)}
      >
        <>
          <div style={{ textAlign: "center" }}>
            <p className="import-client-header" style={{ fontSize: "18px" }}>
              Contact Import
            </p>
          </div>
          <div className="client-import-all-detail-pop">
            <div className="client-import-middle-details">
              <a
                href="/template/contact_import_template.xlsx"
                className="text-sm font-semibold"
              >
                Download Excel Template
              </a>
              <span>
                <AiOutlineDownload className="text-xl" />{" "}
              </span>
            </div>
            <div className="client-import-drag-drop-section">
              <div className="drag-drop-sec">
                <p className="client-drag-file-import">
                  Drag File Here To Import
                </p>
                <p className="client-or-extra">OR</p>
                <p className="client-browse-import">
                  {" "}
                  <i>Browse</i>{" "}
                </p>
                <p className={`${filesName.length > 0 ? "client-file-name" : "client-file-allowed"}`}>
                  {filesName ? filesName : "only .xls and .csv file allowed"}
                </p>
              </div>
            </div>
            <div className="client-input-file-sec">
              <input
                ref={inputRef}
                type="file"
                id="fileSelect"
                required
                onChange={(e: any) => handleFile(e)}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
            </div>
            <div className="client-import-btn" style={{ marginBottom: "15px" }}>
              <button
                type="submit"
                className="client-submit-click"
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
            </div>
            {importError?.length > 0 && <div className="flex justify-center"> <div className="text-center text-[red] font-medium max-h-[180px] max-w-[340px] overflow-y-scroll">
              {importError?.map((item: any, index: any) => {
                index++;
                return <p className="mb-[5px] text-left pr-[20px]">{`${index}) ${item.error}`}</p>
              })}

            </div></div>}
          </div>
        </>
      </Modal>
      <Modal
        centered
        width={340}
        className="client-export-popup-modal"
        open={openExportModel}
        onOk={() => setOpenExportModel(false)}
        onCancel={() => setOpenExportModel(false)}
        footer={null}
      >
        <>
          <div>
            <p
              className="client-contact-export-header"
              style={{
                fontSize: "18px",
                fontWeight: "500",
                marginBottom: "15px",
              }}
            >
              Contact Export
            </p>
          </div>
          <div className="export-client-all-details" style={{ paddingTop: "0px" }}>
            <div
              className="export-first-select-all flex items-center"
            >
              <input
                id="export-selectAll"
                style={{
                  marginLeft: "5px",
                  height: "15px",
                  width: "15px",
                  cursor: "pointer",
                }}
                checked={
                  contactColumns.map((e: any) => e.isSelected).includes(false)
                    ? false
                    : true
                }
                type="checkbox"
                onClick={(ele: any) => selectAllColumn(ele)}
              />
              <label htmlFor="export-selectAll" className="cursor-pointer">Select All</label>
            </div>
            <div className="export-scroll-section">
              <ul className="export-ul">
                {contactColumns?.map((e: any) => {
                  return (
                    <>
                      <li className="client-export-data-details flex items-center">
                        <input
                          className="mr-[7px] cursor-pointer"
                          type="checkbox"
                          checked={e?.isSelected}
                          value={e?.accessorKey}
                          onClick={(ele: any) => selectExportColumn(ele)}
                        />
                        {e?.header}
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
            <div className="export-btn" style={{ marginTop: "9px" }}>
              <Button className="flex justify-center items-center" loading={exportLoader} onClick={() => exportToExcel()}>
                Export
              </Button>
            </div>
          </div>
        </>
      </Modal>
      <ClientExportLoader isExportingOpen={isExportingOpen}/>
    </>
  );
};

export default ClientExport;
