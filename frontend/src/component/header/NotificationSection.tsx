import { useDispatch, useSelector } from "react-redux";
import { BiErrorCircle } from "react-icons/bi";
import ContactAddNote from "../contacts/ContactAddNote";
import EditContactNote from "../contacts/EditContactNote";
import NotificationConfirmation from "../../popUps/NotificationConfirmation";
import "../../styles/notification/NotificationSection.css";
import { useEffect, useState } from "react";
import { Select, Space, Spin } from "antd";
import { userList } from "../../services/userServices";
import { nextfollowNotification } from "../../services/contactAddNote";
import { setContactNotificationData } from "../../redux/contactSlice";
import ReportingManagerData from "../../popUps/clientPopUps/ReportingManagerData";
import moment from "moment";

const NotificationSection = () => {
  // const options: SelectProps['options'] = [];

  const dispatch: any = useDispatch();

  const [userNameAndIds, setUserNameAndIds] = useState([]);
  const [notificationLoader, setNotificationLoader] = useState(false);
  const { contactNotificationData } = useSelector(
    (state: any) => state.contact
  );

  

  useEffect(() => {
    setNotificationLoader(true);
    userList()
      .then((res: any) => {
        if (res.success) {
          setNotificationLoader(false);
          setUserNameAndIds(res?.data);
        } else {
          setNotificationLoader(false);
        }
      })
      .catch(() => {
        setNotificationLoader(false);
      });
  }, []);

  const handleChange = (value: string[]) => {
    setNotificationLoader(true);

    nextfollowNotification({ userIds: value || [] })
      .then((res: any) => {
        if (res.success) {
          setNotificationLoader(false);
          dispatch(setContactNotificationData(res?.data));
        } else {
          setNotificationLoader(false);
        }
      })
      .catch(() => {
        setNotificationLoader(false);
      });
  };

  return (
    <div className="flex justify-center h-[88%] ">
      <div className="w-[35rem] flex flex-col  shadow-lg rounded-md mt-[20px] bg-slate-300 gap-2">
        <div className="flex items-center justify-center gap-3 mt-5">
          <BiErrorCircle className="text-3xl text-primary" />
          <h1 className="text-2xl font-semibold justify-center flex">
            Todays Meeting Alert!
          </h1>
        </div>
        <div className="flex justify-center pt-3 pb-3">
          <Space
            className=""
            style={{ width: "93%", paddingRight: "11px" }}
            direction="vertical"
          >
            <Select
              mode="multiple"
              allowClear
              className="notify-search-inp"
              style={{ width: "100%" }}
              placeholder="Select user to see their notification"
              onChange={handleChange}
              filterOption={(input: any, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={userNameAndIds?.map((ele: any) => {
                return {
                  label: ele?.fullName,
                  value: ele?.id,
                };
              })}
            />
          </Space>
        </div>
        {notificationLoader ? (
          <Space size="middle">
            <Spin size="large" className="absolute right-[48%] bottom-[40%]" />
          </Space>
        ) : (
          <div className="Notification-Section-main-box">
            {contactNotificationData.length === 0 ? (
              <div className="text-3xl h-full flex justify-center items-center">
                {" "}
                No Notes Found
              </div>
            ) : (
              <>
                {contactNotificationData.map((ele: any) => {
                  return (
                    <>
                      <div className="justify-center flex h-max">
                        <div className="shadow-[0px_2px_15px_#a5a5a5] w-[32rem] mb-5 rounded-md hover:bg-slate-200 bg-slate-100 p-2">
                          <div className="flex justify-end">
                            <NotificationConfirmation ele={ele} />
                          </div>

                          <div className="flex flex-col gap-2 text-center">
                            <p className="flex justify-center items-center gap-1">
                              <b>{ele?.createdBy}</b> meeting with{" "}
                              <b><ReportingManagerData cell={ele} /></b>{" "}
                            </p>
                            <p>
                              Scheduled at{" "}
                              <b>
                                {moment(ele?.nextFollowUpDateTime).tz("America/Chicago").format(
                                  "Do MMM YYYY, h:mm A")}{" "}
                                {ele?.timezone && (
                                  <>({ele?.timezone})</>
                                )}
                              </b>
                            </p>
                            <p>
                              <b>Note:</b> <i>{ele?.note}</i>
                            </p>
                          </div>

                          <div className="flex justify-end gap-x-1">
                            <EditContactNote editNoteData={ele} />
                            <ContactAddNote ele={ele} />
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationSection;
