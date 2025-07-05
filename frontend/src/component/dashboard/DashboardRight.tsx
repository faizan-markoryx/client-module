import AllContactNotesAndExport from "./AllContactNotesAndExport"
import DashboardContactNotesList from "./DashboardContactNotesList"
import SearchByUsersAndDateFilter from "./SearchByUsersAndDateFilter"
import DashboardPagination from "./DashboardPagination"
import '../../styles/dashboard/dashboardRight.css'
import { useState } from "react"

const DashboardRight = () => {
  const [isAllContactNoteList, setIsAllContactNoteList]: any = useState([])
  const [isContactNoteLoader, setIsContactNoteLoader]: any = useState(false)
  const [isExportLoader, setIsExportLoader]: any = useState(false)
  const [noteBody, setNoteBody]: any = useState({
    updatedAt: {
      startDate: "",
      endDate: "",
    },
    createdBy: [],
    page: 1,
    perPage: 10,
    isExport: false
  })
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)



  return (
    <div className="dashboard-right-container">
      <AllContactNotesAndExport isExportLoader={isExportLoader} setIsExportLoader={setIsExportLoader} noteBody={noteBody} />
      <SearchByUsersAndDateFilter setNoteBody={setNoteBody} noteBody={noteBody} setPage={setPage} setPerPage={setPerPage} page={page} perPage={perPage} setIsAllContactNoteList={setIsAllContactNoteList} isContactNoteLoader={isContactNoteLoader} setIsContactNoteLoader={setIsContactNoteLoader} />
      <DashboardContactNotesList isAllContactNoteList={isAllContactNoteList} isContactNoteLoader={isContactNoteLoader} />
      <DashboardPagination page={page} perPage={perPage} isAllContactNoteList={isAllContactNoteList} setPage={setPage} setPerPage={setPerPage} />
    </div>

  )
}

export default DashboardRight
// 