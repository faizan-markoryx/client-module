import { useState } from "react";
import logo from "../../assets/Wiseskulls_logo.png";
import text from "../../assets/Wiseskulls_Text.png";
import GreyLogo from "../../assets/wise_back_logo_Grey.png";
import "../../styles/Login.css";
import { userLogin } from "../../services/loginServices";
import { setUserLogin } from "../../redux/loginSlice";
import { useDispatch } from "react-redux";
import { Button } from "antd";

const Login = () => {

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [btnLoader, setBtnLoader] = useState(false);
  const [is400Error, setIs400Error]: any = useState({});

  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    setBtnLoader(true)
    e.preventDefault();

    userLogin(userData)
      .then((res: any) => {
        if (res.success) {
          setBtnLoader(false);
          dispatch(setUserLogin(res.data));
          setUserData({
            email: "",
            password: "",
          });
        }
        else {
          setBtnLoader(false)
        }
      })
      .catch((error: any) => {
        setIs400Error(error?.data?.errors || {})
        setBtnLoader(false)
      });
  };

  return (
    <>
      <div className="main-login-container">
        <div>
          <img src={GreyLogo} alt="" className="back-logo" />
        </div>

        <div className="content-login-box">
          <div className="login-header-sec">
            <img src={logo} alt="" className="mb-2" />
            <img src={text} alt="" className="mt-1 mb-2" />
            <p className="client-text-on-login">Client Module</p>
          </div>

          <form className="login-sec-form" onSubmit={handleSubmit}>
            <div className="flex flex-col pb-4">
              <input
                required
                type="email"
                placeholder="Email"
                onChange={(e: any) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="login-email-inp"
              />
              {is400Error?.email && <span className="text-white pl-2 h-fit">{is400Error?.email}</span>}
            </div>
            <div className="flex flex-col">
              <input
                required
                type="password"
                placeholder="Password"
                onChange={(e: any) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                className="login-pass-inp"
              />
              {is400Error?.password && <span className="text-white pl-2">{is400Error?.password}</span>}
            </div>
            <Button loading={btnLoader} disabled={btnLoader} htmlType="submit" className="login-but">
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
