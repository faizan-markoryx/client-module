import { message } from "antd";
import axios from "axios";
// 
// const API_URL = "http://192.168.1.186:8080"; // Mehmud
// const API_URL = "http://192.168.1.138:8080"; // Akram PC
// const API_URL = "http://192.168.1.105:8080"; // Akram PC LAN
// const API_URL = "http://192.168.1.174:8080"; // Siraj
// const API_URL = "https://client-module-backend-92st2.ondigitalocean.app"; // Live

const API_URL = import.meta.env.VITE_API_URL;


const getHeader = () => {
  const user = localStorage.getItem("clientModuleUserData");
  const token = user ? JSON.parse(user).token : null;

  if (user) {
    return {
      "Content-Type": "application/json",
      authorization: token
    }
  }
};

const getFormHeader = () => {

  const user = localStorage.getItem("clientModuleUserData");
  const token = user ? JSON.parse(user).token : null;

  if (user) {
    return {
      "Content-Type": 'multipart/form-data',
      authorization: token
    }
  }
};




export default class Http {
  static get(url: string, msg: boolean) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: `${API_URL}/${url}`,
        headers: getHeader(),
      })
        .then((response: any) => {
          if (response.data && response.data.success) {
            response.data.message &&
              msg &&
              message.success(response.data.message, 0.6);
            resolve(response.data);
          } else {
            message.success(response.data.message, 0.6);
            reject(response.data);
          }
        })
        .catch((error: any) => {
          if (error.response.status === 404) {
            message.error(error.response.data.message);
          } else if (error.response.status === 429) {
            message.error(error.response.data.message, 5);
          } else if (error.response.status === 401) {
            localStorage.clear(); //pending
            window.location.pathname = "/"; //pending
            message.error("Logged Out");
          } else {
            message.error("Server Error");
          }
          if (
            error.response.data.message === "Invalid or expired token provided!"
          ) {
            localStorage.clear();
            window.location.pathname = "/";
          }
          reject(error.response.data);
        });
    });
  }

  static post(url: string, body: any, msg: boolean) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: `${API_URL}/${url}`,
        data: body,
        headers: getHeader(),
      })
        .then((response: any) => {
          if (response.data && response.data.success) {
            response.data.message &&
              msg &&
              message.success(response.data.message, 1.5);
            resolve(response.data);
          } else {
            message.error(response.data.message, 1.5);
            resolve(response.data);
          }
        })
        .catch((error: any) => {
          error.response.data.message &&
            msg &&
            message.error(error.response.data.message);
          if (error.response.status === 429) {
            message.error(error.response.data, 5);
          }
          if (url !== "user/login") {
            setTimeout(() => {
              if (error.response.status === 401) {
                localStorage.clear();
                window.location.pathname = "/";
              }
            }, 2000);
          }
          reject(error.response);
        });
    });
  }

  static put(url: string, body: any, msg: boolean) {
    return new Promise((resolve, reject) => {
      axios({
        method: "put",
        url: `${API_URL}/${url}`,
        data: body,
        headers: getHeader(),
      })
        .then((response: any) => {
          if (response.data && response.data.success) {
            response.data.message &&
              msg &&
              message.success(response.data.message, 1);
            resolve(response.data);
          } else {
            response.data.message && message.error(response.data.message);
            reject(response.data);
          }
        })
        .catch((error: any) => {
          if (error.response.status === 429) {
            message.error(error.response.data, 5);
          }
          if (error.response.status === 401) {
            localStorage.clear();
            window.location.pathname = "/";
          }
          reject(error.response);
        });
    });
  }

  static delete(url: string, msg: boolean) {
    return new Promise((resolve, reject) => {
      axios({
        method: "delete",
        url: `${API_URL}/${url}`,
        headers: getHeader(),
      })
        .then((response: any) => {
          if (response.data && response.data.success) {
            response.data.message &&
              msg &&
              message.success(response.data.message, 1);
            resolve(response.data);
          } else {
            reject(response.data);
          }
        })
        .catch((error: any) => {
          if (error.response.status === 429) {
            message.error(error.response.data, 5);
          } else if (error.response.status === 401) {
            error.response.message && message.error(error.response.message);
            localStorage.clear();
            window.location.pathname = "/";
          }
          reject(error.response.data);
        });
    });
  }

  static formPut(url: string, body: any, msg: boolean) {
    return new Promise((resolve, reject) => {
      axios({
        method: "put",
        url: `${API_URL}/${url}`,
        data: body,
        headers: getFormHeader(),
      })
        .then((response: any) => {
          if (response.data && response.data.success) {
            response.data.message &&
              msg &&
              message.success(response.data.message, 1.5);
            resolve(response.data);
          } else {
            message.error(response.data.message, 1.5);
            resolve(response.data);
          }
        })
        .catch((error: any) => {
          error.response.data.message &&
            msg &&
            message.error(error.response.data.message);
          if (error.response.status === 429) {
            message.error(error.response.data, 5);
          }
          reject(error.response);
        });
    });
  }

  static formPost(url: string, body: any, msg: boolean) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: `${API_URL}/${url}`,
        data: body,
        headers: getFormHeader(),
      })
        .then((response: any) => {
          if (response.data && response.data.success) {
            response.data.message &&
              msg &&
              message.success(response.data.message, 1.5);
            resolve(response.data);
          } else {
            message.error(response.data.message, 1.5);
            resolve(response.data);
          }
        })
        .catch((error: any) => {
          error.response.data.message &&
            msg &&
            message.error(error.response.data.message);
          if (error.response.status === 429) {
            message.error(error.response.data, 5);
          }
          reject(error.response);
        });
    });
  }

}
