import { useEffect, useState } from "react";
import Http from "../../services/http";
import { Spin } from 'antd';
import "../../styles/dashboard/targetedManagersCount.css"


const TargetedManagersCount = () => {
  const [todaysCall, setTodaysCall]: any = useState("");
  const [isTodayCallSpin, setIsTodayCallSpin] = useState(false)

  useEffect(() => {
    todayTargetedManagersList()
  }, []);

  const todayTargetedManagersList = () => {
    setIsTodayCallSpin(true)
    Http.get("dashboard/total-managers-connected-today", false).then((res: any) => {
      setTodaysCall(res.data);
      setIsTodayCallSpin(false)
    }).catch(() => {
      setIsTodayCallSpin(false)
    })
  }

  return (
    <div className="todayTargetedManagersList-main-container">
      {/* <p className="text-primary text-base font-bold">Targeted Managers</p> */}
      <div className="todayscall-and-connected-both-container">
        {isTodayCallSpin ? <Spin /> : <p className="totalCountInNumber">{todaysCall > 0 ? todaysCall : "0"}</p>}
        <p className="totalCallsConnectedWord">Total Calls Connected</p>
        <p className="todayWord">Today</p>
      </div>
      <div className="topManagersList">Top Managers Targeted by in the list</div>
    </div>
  )
}

export default TargetedManagersCount
