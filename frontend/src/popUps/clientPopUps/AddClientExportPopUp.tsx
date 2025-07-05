import "../../styles/client/addClientExportPopUp.css";
import { useEffect, useState } from "react";
import { Modal, Checkbox, message } from "antd";
import exportFromJSON from "export-from-json";
import ClientExportLoader from "./ClientExportLoader";
import { getClientData } from "../../services/clientServices";
import { useDispatch, useSelector } from "react-redux";
import { setClientRefresh, setClientSelectedId } from "../../redux/clientSlice";

const AddClientExportPopUp = () => {
  const [clientExportOpenModal, setClientExportOpenModal] = useState(false);
  const [isExportingOpen, setIsExportingOpen] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [selectCheckData, setSelectCheckData]: any = useState([]);

  const [selectAllChecked, _setSelectAllChecked] = useState([
    { accessorKey: "id", header: "ID", isSelected: false },
    { accessorKey: "clientName", header: "Client Name", isSelected: false },
    { accessorKey: "websiteUrl", header: "Website", isSelected: false },
    { accessorKey: "category", header: "Category", isSelected: false },
    { accessorKey: "industry", header: "Industry", isSelected: false },
    { accessorKey: "city", header: "City", isSelected: false },
    { accessorKey: "state", header: "State", isSelected: false },
    { accessorKey: "country", header: "Country", isSelected: false },
    { accessorKey: "paymentTerm", header: "Payment Terms", isSelected: false },
    { accessorKey: "clientStatus", header: "Client Status", isSelected: false },
    { accessorKey: "ownership", header: "Ownership", isSelected: false },
    { accessorKey: "createdBy", header: "Created By", isSelected: false },
    { accessorKey: "updatedBy", header: "Updated By", isSelected: false },
    { accessorKey: "createdAt", header: "Created At", isSelected: false },
    { accessorKey: "updatedAt", header: "Updated At", isSelected: false },
  ]);

  const showClientExportModal = () => {
    setClientExportOpenModal(true);
    const openExportSection: any = document.getElementById("mainsss");
    openExportSection.style.display = "none";
  };

  const { clientDataformat, clientSelectedIDs } = useSelector(
    (state: any) => state?.client
  );

  const exportBody = () => {
    if (clientSelectedIDs?.length > 0) {
      const body = {
        ...clientDataformat,
        id: clientSelectedIDs,
        isExport: true,
      };

      return body;
    } else {
      const body = {
        ...clientDataformat,
        isExport: true,
      };

      return body;
    }
  };

  useEffect(() => {
    if (!clientExportOpenModal) return;
    // async () => {
    //      setClientExportOpenModal(false);
    //     setIsExportingOpen(true);
    getClientData(exportBody())
      .then((res: any) => {
        if (res.success) {
          setFilterData(res?.data?.data);
          //    setIsExportingOpen(false);
        }
      })
      .catch(() => {
        setIsExportingOpen(false);
      });
    //   };
  }, [clientExportOpenModal]);

  const dispatch = useDispatch();

  const selectExportColumn = (ele: any) => {
    const newColumnArr: any = [];
    selectAllChecked?.map((e: any) => {
      if (e?.accessorKey === ele.target.value) {
        e.isSelected = !e.isSelected;
        newColumnArr.push(e);
      } else {
        newColumnArr.push(e);
      }
      setSelectCheckData(newColumnArr);
    });
  };

  const selectAllColumn = (ele: any) => {
    const newClomnArr: any = [];
    selectAllChecked?.map((e: any) => {
      if (ele.target.checked) {
        if (!e.isSelected) {
          e.isSelected = true;
        } else if (e.isSelected) {
          e.isSelected = true;
        }
      } else if (!ele.target.checked) {
        if (!e.isSelected) {
          e.isSelected = false;
        } else if (e.isSelected) {
          e.isSelected = false;
        }
      }
      newClomnArr.push(e);
    });
    setSelectCheckData(newClomnArr);
  };

  const FilteredData: any = filterData?.map((e: any) => {
    let obj: any = {};
    selectCheckData?.map((item: any) => {
      if (item.isSelected) {
        return (obj = { ...obj, [item.accessorKey]: e[item.accessorKey] });
      }
    });

    return obj;
  });


  const exportToExcel = () => {
    const date = new Date();
    const dateName = `ClientData_${date.getDate()}-${date.getMonth()}-${date.getFullYear()}/time_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
    const fileName = dateName;
    const exportType = "csv";
    const data = FilteredData;
    if (data?.length > 0) {
      exportFromJSON({ data, fileName, exportType });
    } else {
      message.error("Data Not Availble!");
    }
  };

  return (
    <>
      <div>
        <p onClick={() => showClientExportModal()}>Export</p>
      </div>
      <Modal
        className="client-export-popup-modal"
        open={clientExportOpenModal}
        onOk={() => setClientExportOpenModal(false)}
        onCancel={() => setClientExportOpenModal(false)}
        footer={null}
      >
        <div>
          <p className="client-contact-export-header"
          style={{
            fontSize: "18px",
            fontWeight: "500",
            marginBottom: "0px",
          }}
          >Client Export</p>
        </div>
        <div className="export-client-all-details">
          <div className="export-first-select-all flex items-center">
            <input
              type="checkbox"
              style={{
                marginLeft: "5px",
                height: "15px",
                width: "15px",
                cursor: "pointer",
              }}
              onClick={(ele: any) => selectAllColumn(ele)}
            />
           <label htmlFor="">Select All</label>

          </div>
          <ul className="export-scroll-section">
            {selectAllChecked.map((column, index) => {
              return (
                <li className="client-export-data-details" key={index}>
                  <Checkbox
                    checked={column?.isSelected}
                    value={column?.accessorKey}
                    onChange={(ele: any) => selectExportColumn(ele)}
                    type="checkbox"
                  >
                    <span className="pr-2 pl-2 font-semibold">
                      {column?.header}
                    </span>
                  </Checkbox>
                </li>
              );
            })}
          </ul>
          <div className="export-last-btn">
            <button
              className="client-export-click"
              onClick={() => {
                if (FilteredData && Object?.keys(FilteredData[0])?.length > 0) {
                  setClientExportOpenModal(false);
                  setIsExportingOpen(true);
                  setTimeout(() => {
                    exportToExcel();
                    dispatch(setClientRefresh());
                    dispatch(setClientSelectedId(""));
                    setIsExportingOpen(false);

                  }, 1500);
                } else {
                  message.error("Please select Rows to export.")
                }
              }
              }
            >
              Export
            </button>
          </div>
        </div>
      </Modal>
      <ClientExportLoader
        isExportingOpen={isExportingOpen}
      />
    </>
  );
};

export default AddClientExportPopUp;
