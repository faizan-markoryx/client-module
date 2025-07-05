import TargetedManagersCount from "./TargetedManagersCount"
import TargetedManagersList from "./TargetedManagersList"
import "../../styles/dashboard/dashboardLeft.css"

const DashboardLeft = () => {
    return (
        <div className="dashboard-left-container">
            <TargetedManagersCount />
            <TargetedManagersList />
        </div>
    )
}

export default DashboardLeft
