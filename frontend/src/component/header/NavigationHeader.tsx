import { useState, useEffect, useRef } from "react";
import { RiDashboardFill } from "react-icons/ri";
import { MdInsertChart } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaBell, FaUserFriends } from "react-icons/fa";
import { TbPhoneCall, TbReport } from "react-icons/tb";
// import headerLogo from "../../assets/Wiseskulls_logo.png";
import headerLogo from "../../assets/images/logo-light.svg";
// import headerLogoText from "../../assets/Wiseskulls_Text.png";
import "../../../src/styles/NavigationHeader.css";
import { Badge } from "antd";
import { Link, useLocation } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector, useDispatch } from "react-redux";
import { nextfollowNotification } from "../../services/contactAddNote";
import { setContactNotificationData } from "../../redux/contactSlice";
// import { IoMdSwitch } from "react-icons/io";
import { AiFillExclamationCircle, AiOutlinePoweroff } from "react-icons/ai";
import { setUserLogOut } from "../../redux/loginSlice";


const NavigationHeader = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [userLoginData, setUserLoginData]: any = useState({});
  const [isConfirm, setIsConfirm]: any = useState(false);
  const ref: any = useRef(null);




  const { contactNotificationData, noteRefresh } = useSelector(
    (state: any) => state?.contact
  );


  const headerList = [
    userLoginData?.role == 0 &&
    {
      title: "Dashbord",
      icon: <RiDashboardFill />,
      path: "/dashboard",
    },
    {
      title: "Clients",
      icon: <MdInsertChart />,
      path: "/clients",
    },
    {
      title: "Contacts",
      icon: <TbPhoneCall />,
      path: "/contacts",
    },
    {
      title: "",
      icon: <FaBell />,
      path: "/notification",
    },
  ];



  useEffect(() => {
    const fullData = localStorage.getItem("clientModuleUserData");
    const newData = fullData ? JSON.parse(fullData) : null;
    setUserLoginData(newData);
  }, [])


  const dispatch: any = useDispatch();

  useEffect(() => {
    NotificationData();
  }, [noteRefresh, location.pathname == "/notification"]);

  const NotificationData = () => {
    nextfollowNotification({ "userIds": [] })
      .then((res: any) => {
        dispatch(setContactNotificationData(res?.data));
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShowMenu(false);
      setIsConfirm(false)
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const setLogoutFun = (e: any) => {
    e.preventDefault();
    dispatch(setUserLogOut
      ())
    localStorage.clear();
    window.location.reload();

  }





  return (
    <div>
      <div className="navigation-header-main-div">
        <div className="img-section ">
          <Link to={"/dashboard"}>
            {" "}
            <img src={headerLogo} className="w-[84px]" alt="" />
          </Link>
          {/* <Link to={"/dashboard"}>
            <img src={headerLogoText} className="text-logo" alt="" />
          </Link> */}
        </div>
        <div className="flex gap-1 items-center">
          {headerList?.map((e: any, index) => {
            return (
              <>
                <Link
                  to={e.path}
                  key={index}
                  style={{
                    width: e.path == "/notification" ? "50px" : "7.5rem",
                    gap: 0,
                  }}

                  className={
                    location.pathname === e.path
                      ? "selected"
                      : e ? "header-list-section" : ""
                  }
                >

                  <span
                    className="text-2xl"
                    style={{
                      position: "relative",
                    }}
                  >
                    <>
                      {e.path == "/notification" ? (
                        <span
                          style={{
                            position: "absolute",
                            right: "-8px",
                            top: "-20px",
                          }}
                        >
                          <Badge
                            count={contactNotificationData?.length}
                            showZero
                          ></Badge>
                        </span>
                      ) : (
                        ""
                      )}
                    </>


                    {e.icon}
                  </span>
                  <span className="">
                    {e.tittle == "Menu" ? (
                      <Avatar
                        name="Foo Bar"
                        size="30"
                        round={true}
                        className="relative right-[1.9rem]"
                      />
                    ) : (
                      ""
                    )}

                    {e.title}
                  </span>
                </Link>
              </>
            );

          })}

          <div
            className="avtar-and-menu-sec"
            onClick={() => {
              setShowMenu(!showMenu);
              // userFun();
            }}
          >
            <Avatar name={`${userLoginData?.firstName} ${userLoginData?.lastName}`} size="30" round={true} />
            <GiHamburgerMenu className="text-2xl  items-center" />
          </div>

          {showMenu && (
            <>
              <div className={userLoginData?.role == 1 ? 'menu-popup1' : "menu-popup"} ref={ref}>
                <div className="img-and-user-name-in-menu">
                  <div>
                    <Avatar name={`${userLoginData?.firstName} ${userLoginData?.lastName}`} size="50" round={true} />
                  </div>
                  <div className="flex flex-col">
                    <b className="font-semibold text-lg">
                      {userLoginData?.firstName?.charAt(0).toUpperCase() +
                        userLoginData?.firstName?.slice(1) + " " + userLoginData?.lastName?.charAt(0).toUpperCase() +
                        userLoginData?.lastName?.slice(1)}
                    </b>
                    <b className="font-semibold text-sm">
                      {userLoginData?.role == 0 ? "Admin" : "Account Manager"}
                    </b>
                  </div>
                </div>
                {
                  userLoginData?.role == 0 ?


                    <div className="flex flex-col pl-[3rem]">
                      <p className="pt-[2rem] font-bold underline ">Manage</p>
                      <Link
                        to="/users"
                        className="user-section  "
                        onClick={() => setShowMenu(false)}
                      >
                        <FaUserFriends className="text-[25px] text-primary " />
                        User
                      </Link>
                      <Link
                        to="/reports"
                        className="report-sec "
                        onClick={() => setShowMenu(false)}
                      >
                        <TbReport className="text-[25px] text-primary" />
                        Report
                      </Link>
                    </div>

                    : ''
                }
                <div className="log-out-div ">
                  <button
                    className="log-out-icon "
                    onClick={() => setIsConfirm(true)}
                  >
                    <AiOutlinePoweroff className='text-[22px] pt-[3px]'/>
                    Log out</button>
                  {isConfirm &&
                    <>
                      <div className="  modal-mask fixed top-0 left-0 w-full h-full bg-[#000000b5]">
                      </div>
                      <div className="confirm-delete-box z-50">
                        <p className='text-base'>
                          <AiFillExclamationCircle className='alert-icon' />
                          Are you sure you want to logout ?
                        </p>
                        <div className="btns-for-log">
                          <button
                            className="click-confirm-btn"
                            onClick={() => setIsConfirm(false)}>No</button>
                          <button
                            className="confirm"
                            onClick={setLogoutFun}>Yes</button>
                        </div>
                      </div>

                    </>
                  }
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigationHeader;
