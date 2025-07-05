import "../../styles/client/addClientImportPopUp.css";
import { useState } from "react";
import { Button, Modal, message } from "antd";
import { AiOutlineDownload } from "react-icons/ai";
import * as XLSX from "xlsx";
import { submitImport } from "../../services/clientServices";
import { useDispatch } from "react-redux";
import { setClientRefresh } from "../../redux/clientSlice";

const AddClientImportPopUp = () => {
    const [clientImportOpenModal, setClientImportOpenModal]: any = useState(false);
    const [importData, setImportData]: any = useState([]);
    const [isImporting, setIsImporting]: any = useState(false);
    const [filesName, setFilesName]: any = useState("");
    const [importError, setImportError]: any = useState([]);


    const showClientImportModal = () => {
        setClientImportOpenModal(true);
        const openImportSection: any = document.getElementById("mainsss");
        openImportSection.style.display = "none";
    };

    const readUploadFile = (e: any) => {
        e.preventDefault();
        if (e.target.files) {
            setFilesName(e.target.files[0].name)
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet);
                setImportData(json);
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    };

    const dispatch = useDispatch()
    const handleImportSubmit = () => {
        if (importData?.length >0){
        setIsImporting(true)
        submitImport(importData).then((res:any) =>{
              if(res.success && !res?.error) {
                setImportData([])
                setIsImporting(false)
                setClientImportOpenModal(false)
                dispatch(setClientRefresh())
                if(res.success && res?.error) {
                setImportError(res?.error);
            }

            }else {
                setIsImporting(false)
                setImportError(res.error);
            }
         }).catch((err:any)=>{
            setClientImportOpenModal(false)
            setImportError(err.error);


         } )
        } else  {
        message.warning("Please upload files.")
        }
    };
    return (
        <>
            <div>
                <p
                    onClick={() => {
                        showClientImportModal();
                    }}
                >
                    Import
                </p>
            </div>
            <Modal
                className="client-import-popup-modal"
                open={clientImportOpenModal}
                onOk={() => setClientImportOpenModal(false)}
                onCancel={() => setClientImportOpenModal(false)}
                footer={null}
            ><div>
                <div className="h-auto">
                    <p className="import-client-header">Client Import</p>
                </div>
                <div className="client-import-all-detail-pop">
                    <div className="client-import-middle-details">
                        <a
                            href="/template/client_import_template.xlsx"
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
                            <p className={`${filesName.length>0 ? "client-file-name" :"client-file-allowed" }`}>
                              { filesName ?filesName :"only .xls and .csv file allowed"}
                            </p>
                        </div>
                    </div>
                    <form className="client-input-file-sec">
                        <input
                            type="file"
                            name="upload"
                            id="upload"
                            onChange={readUploadFile}
                        />
                    </form>
                    <div className="client-import-btn">
                        <Button loading={isImporting}  className="client-submit-click" onClick={handleImportSubmit}>
                            Submit
                        </Button>
                    </div>
                    {importError?.length > 0 && <div className="flex justify-center  max-h-[80px] overflow-y-auto"> 
                    <div className="text-center text-[red] font-medium  max-w-[340px] overflow-y-scroll">
              {importError?.map((item:any, index:any) =>{
                index++;
                return <p className="mb-[5px] text-left pr-[20px]">{`${index}) ${item}`}</p>
              })}
              
             </div></div>}
                </div>
                </div>
            </Modal>
        </>
    );
};

export default AddClientImportPopUp;
