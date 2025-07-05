import { Modal } from "antd";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import "../../styles/client/EditClientNotes.css";
import AllClientEditNotePopUp from "../../popUps/clientPopUps/AllClientEditNotePopUp";
import AllClientDeleteNotePopUp from "../../popUps/clientPopUps/AllClientDeleteNotePopUp";
import { getClientNotesApi } from "../../services/clientServices";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setClientRefresh } from "../../redux/clientSlice";
import { AiOutlineClose } from "react-icons/ai";
import AddClientNotePopUp from "../../popUps/clientPopUps/AddClientNotePopUp";
import moment from "moment";



const EditClientNotes = ({
  editClientNotesModal,
  setEditClientNotesModal,
  clientId,
}: any) => {
  const [clientAllNoteData, setClientAllNoteData] = useState([]);
  const { clientNoteRefresh } = useSelector((state: any) => state?.client);
  const [isClientTableAllClientNoteLoader, setIsClientTableAllClientNoteLoader] = useState(false);

  const dispatch = useDispatch();

  const clientNoteTable: any = [
    { title: "ID", dataIndex: "id" },
    { title: "Notes", dataIndex: "note" },
    { title: "Created At", dataIndex: "createdAt" },
    { title: "Updated At", dataIndex: "updatedAt" },
    { title: "Created By", dataIndex: "created_by" },
    { title: "Action", dataIndex: "action", key: "Action" },
  ];

  useEffect(() => {
    setIsClientTableAllClientNoteLoader(true)
    if (!editClientNotesModal) {
      return;
    }
    getClientNotesApi(clientId?.id).then((res: any) => {
      if (res.sec) {
        setIsClientTableAllClientNoteLoader(false)
      } else (
        setIsClientTableAllClientNoteLoader(false)
      )
      setClientAllNoteData(res?.data);
    });
  }, [clientId?.id, editClientNotesModal, clientNoteRefresh]);

  return (
    <>
      <Modal
        wrapClassName="edit-client-note-section"
        open={editClientNotesModal}
        onOk={() => {
          setEditClientNotesModal(false);
          dispatch(setClientRefresh());
        }}
        onCancel={() => {
          setEditClientNotesModal(false);
        }}
        footer={null}
      >
        <div>
          <div className="edit-header-section">
            <div className="w-[50%] flex justify-end ml-52">
              <p className="all-client-data-head">All Client Notes Of {clientId?.clientName}</p>
            </div>
            <div className="w-[50%] flex justify-end">
              <span className="text-primary cursor-pointer">
                <AiOutlineClose
                  className=" mr-5 text-2xl text-white"
                  onClick={() => setEditClientNotesModal(false)}
                />{" "}
              </span>
            </div>
          </div>
          {
            isClientTableAllClientNoteLoader ?
              (
                <Spin size="large" className="client-note-loader-division" />
              )
              :
              (
                <div className="edit-client-table-division">
                  <div className="client-middle-detail-section h-[350px] overflow-y-scroll">
                    <table className="w-[100%]">
                      <thead>
                        <tr className="client-note-data-details">
                          {clientNoteTable?.map((e: any, index: any) => {
                            return (
                              <th key={index} className="table-th-note">
                                {e?.title}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody className="edit-client-tbody-section">
                        {clientAllNoteData.map((ele: any, index: any) => {
                          return (
                            <tr className="client-note-row-sec" key={index}>
                              <td className="edit-client-tbody-td">{ele?.id}</td>
                              <td className="edit-client-tbody-td">{ele?.note}</td>
                              <td className="edit-client-tbody-td">
                                {moment(ele?.createdAt).format("Do MMM YYYY, h:mm A")}
                              </td>
                              <td className="edit-client-tbody-td">
                                {moment(ele?.updatedAt).tz('America/Chicago').format("Do MMM YYYY, h:mm A")}
                              </td>
                              <td className="edit-client-tbody-td">{ele?.createdBy}</td>
                              <div className="edit-note-add-delete-sec">
                                <AllClientEditNotePopUp
                                  noteData={ele}
                                />
                                <AllClientDeleteNotePopUp deleteId={ele} />
                              </div>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="all-client-note-last-end-section">
                    <AddClientNotePopUp clientId={clientId} />
                  </div>
                </div>
              )
          }
        </div>
      </Modal>
    </>
  );
};

export default EditClientNotes;
