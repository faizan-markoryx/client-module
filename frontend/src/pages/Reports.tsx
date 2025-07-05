import LabelandCountTable from "../component/reports/LabelandCountTable";
import UserwiseReportTable from "../component/reports/UserwiseReportTable";


const Reports = () => {
  return (
    <div className="bg-[#e9e9e9] h-[90%] overflow-y-scroll">
      <div className="flex justify-center items-center gap-6 pt-5">
        <UserwiseReportTable />
        <LabelandCountTable />
      </div>
      <div className="flex justify-center items-center gap-6 pt-5">
        <UserwiseReportTable />
        <LabelandCountTable />
      </div>
    </div>
  )
}

export default Reports