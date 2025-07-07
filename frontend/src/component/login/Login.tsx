import { useState } from "react";
// import logo from "../../assets/Wiseskulls_logo.png";
// import text from "../../assets/Wiseskulls_Text.png";
// import GreyLogo from "../../assets/wise_back_logo_Grey.png";

import bgLogin from "../../assets/images/login-bg.jpg"
// import bgLogin from "../../assets/images/login-bg5.png"
import lightLogo from "../../assets/images/logo-light.svg"

import "../../styles/Login.css";
import { userLogin } from "../../services/loginServices";
import { setUserLogin } from "../../redux/loginSlice";
import { useDispatch } from "react-redux";
// import { Button } from "antd";

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
      {/* <div className="main-login-container">
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
      </div> */}

      <div className="relative w-full h-screen font-sans">
        {/* Background Image */}
        <img
          src={bgLogin}
          alt="Background"
          className="absolute w-full h-full object-cover"
        />

        {/* Blur Overlay */}
        <div className="absolute w-full h-full bg-black/60" />

        {/* Centered Login Form */}
        <div className="relative flex justify-center items-center h-full z-10">
          <form className="bg-white/10 backdrop-blur-lg pb-10 pt-4 px-10 rounded-2xl w-full max-w-md shadow-2xl border border-white/20" onSubmit={handleSubmit}>
            {/* Logo Section */}
            <div className="flex justify-center">
              <h1 className="text-3xl font-bold text-white">
                <img src={lightLogo} alt="" className="w-32 h-32" />
              </h1>
              {/* If you have an actual image logo, use this:
            <img src="/your-logo.png" alt="Logo" className="h-12" />
            */}
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="text-white block mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                onChange={(e: any) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
              {is400Error?.email && <span className="text-white pl-2 h-fit">{is400Error?.email}</span>}
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="text-white block mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e: any) =>
                  setUserData({ ...userData, password: e.target.value })
                }
                placeholder="Enter Your Password"
                className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
              {is400Error?.password && <span className="text-white pl-2">{is400Error?.password}</span>}
            </div>

            {/* Stylish Button */}
            <button
              type="submit"
              className="relative w-full group border-2 border-[#F57C00] text-[#F57C00] font-bold py-[10px] px-6 rounded-md overflow-hidden transition-all duration-500 ease-in-out hover:text-white hover:shadow-[0_0_20px_rgba(255,115,0,0.7)]"
              disabled={btnLoader}
            >
              <span
                className="absolute inset-0 w-full h-full bg-[#F57C00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-150 ease-out origin-left"
              ></span>
              <span className="relative z-10 delay-200 transition-all duration-300">Login</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
