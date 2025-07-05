import DashboardLeft from "../component/dashboard/DashboardLeft"
import DashboardRight from "../component/dashboard/DashboardRight"
import "../styles/dashboard/dashboard.css"

const Dashboard = () => {

  return (
    <div className="dashboard-main-container">
      <div className="dashboard-both-left-right-section-handler">
        <DashboardLeft />
        <DashboardRight />
      </div>
    </div>
  )
}

export default Dashboard