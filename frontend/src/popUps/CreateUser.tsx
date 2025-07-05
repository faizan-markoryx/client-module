import { useState } from "react";
import { Button, Modal, message } from "antd";
import { Select } from "antd";
import "../styles/CreateUser.css";
import { RxCross2 } from "react-icons/rx";
import { createNewUser } from "../services/addUser";
import { useDispatch } from "react-redux";
import { setPageRefresh } from "../redux/loginSlice";

const CreateUser = ({ setCreateUserModal, createUserModal }: any) => {

    const handleChange = (_value: string, data: any) => {
        setAllDetails({ ...allDetails, role: data.value });
    };
    const [btnLoaderOn, setBtnLoaderOn] = useState(false);
    const [error400Create, setError400Create]: any = useState({});
    const dispatch = useDispatch()

    const [allDetails, setAllDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        role: "",
        confirmPassword: ''
    });

    const createUser = (e: any) => {
        e.preventDefault();
        setBtnLoaderOn(true);


        if (allDetails.confirmPassword == allDetails.password) {
            if (allDetails?.role !== "") {

                createNewUser(allDetails)
                    .then((res: any) => {
                        if (res.success) {
                            dispatch(setPageRefresh())
                            setBtnLoaderOn(false);
                            setCreateUserModal(false)

                        } else {
                            setBtnLoaderOn(false);
                        }
                    })
                    .catch((error: any) => {
                        setError400Create(error?.data?.errors || {});
                        setBtnLoaderOn(false);

                    });
            } else {
                message.error('Please Select Role')
                setBtnLoaderOn(false);
            }
        }
        else {
            message.error('Chek Password And ConfirmPassword')
            setBtnLoaderOn(false);
        }
    };


    return (
        <div>
            <>
                <Modal
                    rootClassName="main-create-user-div"
                    footer={null}
                    width={700}
                    centered={true}
                    open={createUserModal}
                    onOk={() => setCreateUserModal(false)}
                    afterClose={() => {
                        setAllDetails({
                            firstName: "",
                            lastName: "",
                            email: "",
                            phone: "",
                            password: "",
                            role: "",
                            confirmPassword: ''
                        }),
                            setError400Create('')
                    }}
                >
                    <form
                        action=""
                        onSubmit={createUser}
                        className="h-[100%]">
                        <div className="modal-header-section">
                            <div></div>
                            <h1 className="add-user-txt">Add User</h1>
                            <span
                                className="cancel-section "
                                onClick={() => setCreateUserModal(false)}
                            >
                                <RxCross2 />
                            </span>
                        </div>

                        <div className="inp-section-parent">
                            <div className="add-user-all-details-sec">
                                <div className="flex  flex-col">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="lab-for-details ">
                                            <span className="star-section"> *</span>First Name
                                        </label>
                                        <span>
                                            {" "}
                                            {error400Create?.firstName && (
                                                <span className="text-[red]">
                                                    {error400Create?.firstName}
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    <input
                                        required
                                        value={allDetails?.firstName}
                                        placeholder="Enter First Name"
                                        type="text"
                                        className="inp-section outline-none"
                                        onChange={(e: any) =>
                                            setAllDetails({
                                                ...allDetails,
                                                firstName: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="flex  flex-col">
                                    <div className="flex items-center justify-between ">
                                        <label htmlFor="" className="lab-for-details ">
                                            <span className="star-section"> *</span>Last Name
                                        </label>
                                        <span>
                                            {" "}
                                            {error400Create?.lastName && (
                                                <span className="text-[red]">
                                                    {error400Create?.lastName}
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    <input
                                        value={allDetails?.lastName}
                                        required
                                        placeholder="Enter Last Name"
                                        type="text"
                                        className="inp-section outline-none"
                                        onChange={(e: any) =>
                                            setAllDetails({
                                                ...allDetails,
                                                lastName: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className="flex  flex-col">
                                    <div className="flex items-center justify-between ">
                                        <label htmlFor="" className="lab-for-details ">
                                            <span className="star-section"> *</span>Phone
                                        </label>
                                        <span>
                                            {" "}
                                            {error400Create?.phone && (
                                                <span className="text-[red] ">
                                                    {error400Create?.phone}
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    <input
                                        maxLength={10}
                                        minLength={10}
                                        value={allDetails?.phone}
                                        required
                                        // max={10}
                                        placeholder="Enter Phone Number"
                                        className="inp-section outline-none"
                                        onChange={(e: any) =>
                                            setAllDetails({ ...allDetails, phone: e.target.value.replace(/\D+/g, "") })
                                        }
                                    />
                                </div>

                                <div className="flex  flex-col ">
                                    <div className="flex items-center justify-between ">
                                        <label htmlFor="" className="lab-for-details ">
                                            <span className="star-section"> *</span>Email
                                        </label>
                                        <span>
                                            {" "}
                                            {error400Create?.email && (
                                                <span className="text-[red] ">
                                                    {error400Create?.email}
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    <input
                                        value={allDetails?.email}
                                        required
                                        placeholder="Enter Email ID"
                                        type="text"
                                        className="inp-section outline-none"
                                        onChange={(e: any) =>
                                            setAllDetails({ ...allDetails, email: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="" className="lab-for-details ">
                                        <span className="star-section"> *</span>Role
                                    </label>

                                    <Select
                                        value={allDetails?.role}
                                        className="select-section"
                                        style={{ width: 290 }}
                                        onChange={handleChange}
                                        options={[
                                            { value: "0", label: "Admin" },
                                            { value: "1", label: "Account Manager" },
                                        ]}
                                    />
                                </div>

                                <div className="flex  flex-col">
                                    <div className="flex items-center justify-between ">
                                        <label htmlFor="" className="lab-for-details ">
                                            <span className="star-section"> *</span>Password
                                        </label>
                                        <span>
                                            {error400Create?.password && (
                                                <span className="text-[red] ">
                                                    {error400Create?.password}
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    <input
                                        value={allDetails?.password}
                                        required
                                        placeholder="Enter Password"
                                        type="password"
                                        className="inp-section outline-none"
                                        onChange={(e: any) =>
                                            setAllDetails({ ...allDetails, password: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="flex  flex-col">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="lab-for-details ">
                                            <span className="star-section"> *</span>Confirm Password
                                        </label>
                                        <span>
                                            {error400Create?.password && (
                                                <span className="text-[red] ">
                                                    {error400Create?.password}
                                                </span>
                                            )}
                                        </span>
                                    </div>

                                    <input
                                        value={allDetails?.confirmPassword}
                                        required
                                        placeholder="Enter Confirm Password"
                                        type="password"
                                        className="inp-section outline-none"
                                        onChange={(e: any) =>
                                            setAllDetails({ ...allDetails, confirmPassword: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="submit-but-div">
                            <Button
                                loading={btnLoaderOn}
                                disabled={btnLoaderOn}
                                className="submit-but "
                                htmlType="submit"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Modal>
            </>
        </div>
    );
};

export default CreateUser;

