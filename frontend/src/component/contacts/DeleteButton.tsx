import { AiOutlineDelete } from "react-icons/ai";
import Http from "../../services/http";
import { useSelector, useDispatch } from "react-redux";
import { setContactData } from "../../redux/contactSlice";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
const { confirm } = Modal;

const DeleteButton = () => {
  const { selectedIds, contactData }: any = useSelector(
    (state: any) => state.contact
  );
  const dispatch: any = useDispatch();

  const showDeleteConfirm = () => {
    confirm({
      title: "Confirm Delete?",
      icon: <ExclamationCircleFilled />,
      // content: 'Some descriptions',
      okText: "Delete",
      okType: "danger",
      cancelText: "No",
      onOk() {
        const body: any = {
          id: selectedIds,
        };
        Http.post("contact/multiple-delete-contact", body, true)
          .then((res: any) => {
            if (res.success) {
              dispatch(
                setContactData({
                  ...contactData,
                  isRefresh: !contactData.isRefresh,
                })
              );
            }
          })
          .catch((err: any) => {
            console.log("false", err);
          });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      {selectedIds?.length > 0 ? (
        <button
          className="w-[5rem] flex  hover:bg-red-500 hover:text-white  duration-700 items-center text-sm justify-center gap-1 rounded-md h-[2.5rem] bg-[#D4D4D4] transition-[all 0.5s ease-in-out]"
          onClick={showDeleteConfirm}
        >
          <AiOutlineDelete /> Delete
        </button>
      ) : null}
    </>
  );
};

export default DeleteButton;