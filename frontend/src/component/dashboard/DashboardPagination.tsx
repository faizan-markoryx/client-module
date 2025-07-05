import { Pagination, Select } from 'antd';
import '../../styles/dashboard/dashboardPagination.css'
import { Option } from 'antd/es/mentions';
import { RxDoubleArrowLeft, RxDoubleArrowRight } from 'react-icons/rx';


const DashboardPagination = ({ isAllContactNoteList, setPage, setPerPage }: any) => {

  const selectPagination: any = isAllContactNoteList.pagination;

  const pageChangeFun = (e: any) => {
    setPage(e)
  }

  const perPageFun = (ele: any) => {
    setPerPage(ele)
    setPage(1)
  }

  return (
    <>
      <div className="dashboardPagination-main-container">

        <div className="showingPageination">
          Total {selectPagination?.totalRecords} entries
        </div>

        <div className="candidatesPerPageDiv">
          Per Page
          <Select
            popupClassName="perpage-option"
            // open={true}
            defaultValue="10"
            value={selectPagination?.totalPerpage}
            style={{ width: 55 }}
            onChange={(e: any) => { perPageFun(e) }}
          >
            <Option value="10">10</Option>
            <Option value="20">20</Option>
            <Option value="50">50</Option>
            <Option value="100">100</Option>
          </Select>
        </div>

        <div className="paginationLastDiv">
          <span
            className={
              selectPagination?.currentPage === 1
                ? "nex-prev-disable"
                : "nex-prev"
            }
            onClick={() => setPage(1)}
          >
            <RxDoubleArrowLeft />
          </span>
          <Pagination
            defaultCurrent={1}
            pageSize={selectPagination?.totalPerpage || 10}
            current={selectPagination?.currentPage}
            total={selectPagination?.totalRecords}

            onChange={pageChangeFun}
          />
          <span
            onClick={() => pageChangeFun(selectPagination?.totalPage)}
            className={
              selectPagination?.currentPage === selectPagination?.totalPage
                ? "nex-next-disable"
                : "nex-next"
            }
          >
            <RxDoubleArrowRight />
          </span>
        </div>

      </div>
    </>

  )
}

export default DashboardPagination
