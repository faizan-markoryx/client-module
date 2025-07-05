import "../../styles/client/addClientNotePopUp.css";
import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { addClientNoteApi } from "../../services/clientServices";
import { useDispatch } from "react-redux";
import {
  setClientNoteRefresh,
  setClientRefresh,
} from "../../redux/clientSlice";
import { MdNote } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { useSelector } from "react-redux";

const AddClientNotePopUp = ({ addNoteId, clientId }: any) => {
  const [notesData, setNotesData]: any = useState({});
  const select = useSelector((state: any) => state?.client?.clientAddNoteId);
  const [addNoteModalOpen, setAddNoteModalOpen] = useState(false);

  const [noteLoading, setNoteLoading]: any = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!addNoteModalOpen) return;
    setNotesData({
      clientId: addNoteId !== undefined ? addNoteId?.id : select,
      note: "",
    });
  }, [addNoteModalOpen]);

  const allDataReset = () => {
    setNotesData({
      clientId: addNoteId !== undefined ? addNoteId?.id : select,
      note: "",
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setNoteLoading(true);
    addClientNoteApi(notesData)
      .then((res: any) => {
        if (res.success) {
          setNoteLoading(false);
          setAddNoteModalOpen(false);
          setNotesData({
            clientId: "",
            note: "",
          });
          dispatch(setClientRefresh());
          dispatch(setClientNoteRefresh());
        } else {
          setNoteLoading(false);
        }
      })
      .catch(() => {
        setNoteLoading(false);
      });
  };

  return (
    <>
      {addNoteId !== undefined ? (
        <span
          onClick={() => setAddNoteModalOpen(true)}
          className="flex items-center gap-x-2"
        >
          <MdNote className="text-[15px] cursor-pointer" />
          <span className="cursor-pointer">Add Note</span>
        </span>
      ) : (
        <span
          className="note-data-table-flexible"
          onClick={() => {
            setAddNoteModalOpen(true);
          }}
        >
          <IoIosAddCircle className="text-2xl text-green-600 cursor-pointer" />
          <p className="text-lg font-semibold cursor-pointer">Add More Notes</p>
        </span>
      )}

      <Modal
        className="add-note-pop-modal"
        open={addNoteModalOpen}
        onOk={() => setAddNoteModalOpen(false)}
        onCancel={() => setAddNoteModalOpen(false)}
        footer={null}
      >
        <form onSubmit={handleSubmit}>
          <div className="add-note-main-section">
            <div>
              <p className="add-note-header-sec">
                Add Note For (
                {addNoteId ? addNoteId?.clientName : clientId?.clientName})
              </p>
            </div>
            <div className="note-first-section">
              <div className="note-label-or-text">
                <label htmlFor="" className="note-label-sec">
                  <span className="text-red-600"> * </span>
                  Add Note :
                </label>
                <textarea
                  className="note-textarea-sec"
                  name=""
                  id=""
                  required
                  value={notesData.note}
                  onChange={(e) =>
                    setNotesData({ ...notesData, note: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <div className="note-save-clear-btn">
              <Button
                className="note-save-click"
                loading={noteLoading}
                htmlType="submit"
              >
                Save
              </Button>
              <button
                className="note-clear-click"
                type="reset"
                onClick={allDataReset}
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddClientNotePopUp;
