import { Button, Modal, Select } from "antd";
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import "../styles/EditUser.css";
import { memo } from "react";
import { editUserAPI } from "../services/userServices";
import { useDispatch } from "react-redux";
import { setPageRefresh } from "../redux/loginSlice";

const EditUserPopUp = ({
  userEditModal,
  setUserEditModal,
  editUserData,
}: any) => {

  const dispatch = useDispatch();
  const [editUserNewData, setEditUserNewData]: any = useState({});
  const [editDataLoader, setEditDataLoader] = useState(false);


  useEffect(() => {
    if (!userEditModal) {
      return
    }
    setEditUserNewData({
      id: editUserData?.id,
      firstName: editUserData?.firstName,
      lastName: editUserData?.lastName,
      email: editUserData?.email,
      phone: editUserData?.phone,
      password: "",
      role: editUserData?.role,
    });
  }, [editUserData, userEditModal]);




  useEffect(() => { }, [userEditModal]);

  const handleChange = (value: any) => {
    setEditUserNewData({ ...editUserNewData, role: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setEditDataLoader(true)
    editUserAPI(editUserNewData)
      .then(() => {
        dispatch(setPageRefresh());
        setEditDataLoader(false)
        setUserEditModal(false);
      })
      .catch(() => {
        setEditDataLoader(false)

      });
  };

  return (

    <Modal
      wrapClassName="editModalMainDiv"
      footer={null}
      open={userEditModal}
      centered={true}

    >
      <form onSubmit={handleSubmit}>
        <div className="modal-header-section">
          <div></div>
          <h1 className="add-user-txt">Edit User</h1>
          <span
            className="cancel-section "
            onClick={() => setUserEditModal(false)}
          >
            <RxCross2 />
          </span>
        </div>
        <div className="inp-section-parent">

          <div className="flex flex-col">
            <label htmlFor="" className="lab-for-details ">
              <span className="star-section"> *</span>First Name
            </label>
            <input
              required
              value={editUserNewData?.firstName}
              onChange={(e: any) =>
                setEditUserNewData({
                  ...editUserNewData,
                  firstName: e.target.value,
                })
              }
              placeholder="Enter First Name"
              type="text"
              className="inp-section"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="lab-for-details ">
              <span className="star-section"> *</span>Last Name
            </label>
            <input
              required
              value={editUserNewData?.lastName}
              onChange={(e: any) =>
                setEditUserNewData({
                  ...editUserNewData,
                  lastName: e.target.value,
                })
              }
              placeholder="Enter Last Name"
              type="text"
              className="inp-section"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="lab-for-details ">
              <span className="star-section"> *</span>Phone
            </label>
            <input
              required
              maxLength={10}
              minLength={10}
              placeholder="Enter Phone Number"
              className="inp-section"
              value={editUserNewData?.phone}
              onChange={(e: any) =>
                setEditUserNewData({
                  ...editUserNewData,
                  phone: e.target.value.replace(/\D+/g, "")
                })
              }
            />
          </div>

          <div className="flex flex-col ">
            <label htmlFor="" className="lab-for-details ">
              <span className="star-section"> *</span>Email
            </label>
            <input
              required
              placeholder="Enter Email ID"
              type="text"
              className="inp-section"
              value={editUserNewData?.email}
              onChange={(e: any) =>
                setEditUserNewData({
                  ...editUserNewData,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="lab-for-details ">
              <span className="star-section"> *</span>Role
            </label>
            <Select
              className="selectt-section"
              value={editUserNewData?.role == 0 ? "Admin" : "Account Manager"}
              style={{ width: 290 }}
              onChange={handleChange}
              options={[
                { value: "0", label: "Admin" },
                { value: "1", label: "Account Manager" },
                //   { value: "", label: "Account Manager" },
              ]}
            />
          </div>    

          <div className="flex flex-col">
            <label htmlFor="" className="lab-for-details ">
              <span className="star-section"> </span>Password
            </label>
            <input
              placeholder="Enter Password"
              className="inp-section"
              value={editUserNewData?.password}
              onChange={(e: any) =>
                setEditUserNewData({
                  ...editUserNewData,
                  password: e.target.value,
                })
              }
            />
          </div>

        </div>

        <div className="submit-but-div">
          <Button
            loading={editDataLoader}
            htmlType="submit"
            className="submit-but "
          // onClick={() => {
          //   handleSubmit();
          // }}
          >
            Update
          </Button>
        </div>
      </form>
    </Modal>

  );
};

export default memo(EditUserPopUp);
// export default EditUserPopUp