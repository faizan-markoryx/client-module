import { useEffect, useState } from "react";
import Http from "../../services/http";
import { Spin } from 'antd';
import '../../styles/dashboard/targetedManagersList.css'



const TargetedManagersList = () => {
    const [isManagersConnectedToday, setIsManagersConnectedToday]: any = useState([])
    const [isTodayCallSpin, setIsTodayCallSpin]: any = useState(false)


    useEffect(() => {
        totalManagersConnectedToday()
    }, []);

    const totalManagersConnectedToday = () => {
        setIsTodayCallSpin(true)
        Http.get("dashboard/today-targeted-managers-list", false).then((res: any) => {
            setIsManagersConnectedToday(res.data);

            setIsTodayCallSpin(false)
        }).catch(() => {
            setIsTodayCallSpin(false)
        })
    }

    return (
        <div className="totalManagersConnectedToday-main-container">
            {isTodayCallSpin ? (
                <Spin />
            ) : (
                <div className="totalManagersListHandler">
                    {isManagersConnectedToday
                    ?.map((e: any, index: number) => {
                        return (
                            <span className="topManagerListOfToday">{index + 1}){e?.fullName}<p>{e?.count}</p></span>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default TargetedManagersList
