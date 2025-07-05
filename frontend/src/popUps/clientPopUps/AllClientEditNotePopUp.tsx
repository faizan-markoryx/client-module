import "../../styles/client/allClientEditNotePopUp.css";
import { BiEdit } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { updateNewClientNote } from "../../services/clientServices";
import { useDispatch } from "react-redux";
import {
  setClientNoteRefresh,
  setClientRefresh,
} from "../../redux/clientSlice";

const AllClientEditNotePopUp = ({ noteData }: any) => {
  const [isEditNoteModalOpen, setIsEditNoteModalOpen] = useState(false);
  const [editNoteLoading, setIsEditNoteLoading] = useState(false);
  const [newNoteData, setNewNoteData]: any = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEditNoteModalOpen) return;
    setNewNoteData({
      id: noteData?.id,
      clientId: noteData?.clientId,
      note: noteData?.note,
    });
  }, [noteData, isEditNoteModalOpen]);

  const handleSubmitSave = (e: any) => {
    setIsEditNoteLoading(true);
    updateNewClientNote(newNoteData)
      .then((res: any) => {
        if (res.success) {
          setIsEditNoteLoading(false);
          dispatch(setClientNoteRefresh());
          dispatch(setClientRefresh());
          setIsEditNoteModalOpen(false);
        } else {
          setIsEditNoteLoading(false);
        }
      })
      .catch(() => {
        setIsEditNoteLoading(false);
      });
    e.preventDefault();
  };

  return (
    <>
      <div>
        <BiEdit
          className="cursor-pointer"
          onClick={() => setIsEditNoteModalOpen(true)}
        />
      </div>

      <Modal
        className="edit-note-client-popup-modal"
        open={isEditNoteModalOpen}
        onOk={() => setIsEditNoteModalOpen(false)}
        onCancel={() => setIsEditNoteModalOpen(false)}
        footer={null}
      >
        <form onSubmit={handleSubmitSave}>
          <div className="all-client-edit-note-section">
            <div>
              <p className="client-edit-note-header">Edit Note</p>
            </div>
            <div className="edit-note-middle-section">
              <div className="edit-label-and-text">
                <label className="edit-label-division">
                  <span className="text-red-600 text-[18px]"> * </span>
                  Edit Note :
                </label>
                <textarea
                  onChange={(e: any) =>
                    setNewNoteData({ ...newNoteData, note: e.target.value })
                  }
                  value={newNoteData?.note}
                  className="edit-note-textarea-division"
                  name=""
                  id=""
                ></textarea>
              </div>
            </div>
            <div className="edit-note-last-btn">
              <Button
                className="edit-note-save-click"
                loading={editNoteLoading}
                htmlType="submit"
              >
                Update
              </Button>
              <button
                className="edit-note-clear-click"
                type="reset"
                onClick={() => setNewNoteData({ note: "" })}
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

export default AllClientEditNotePopUp;
