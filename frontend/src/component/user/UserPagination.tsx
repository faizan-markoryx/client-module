import { Pagination, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setPagePerPage } from "../../redux/userSlice";
import "../../styles/UserPagination.css";
import { Option } from "antd/es/mentions";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { useState } from "react";

export const UserPagination = () => {
  const dispatch = useDispatch();
  const selectPagination = useSelector(
    (state: any) => state?.userTable?.userTableData?.pagination
  );

  const [perPageValue, setPerPageValue] = useState("20");


  const pageChangeFun = (e: any) => {
    dispatch(setPagePerPage({
      perPage: perPageValue,
      page: e
    }))
  }

  const perPageFun = (ele: any) => {
    setPerPageValue(ele)
    dispatch(setPagePerPage({
      perPage: ele,
      page: 1
    }))
  }

  return (
    <>
      <div className="userTablePaginationMainDiv">

        <div className="showingPageination">
          Showing{" "}
          {selectPagination?.totalRecords === 0
            ? 0
            : (selectPagination?.currentPage - 1) * selectPagination?.totalPerpage + 1}{" "}
          to{" "}
          {selectPagination?.totalRecords === 0
            ? 0
            : selectPagination?.nextPage !== null
              ? selectPagination?.totalPerpage * selectPagination?.currentPage : selectPagination?.totalRecords} {" "}
          of {selectPagination?.totalRecords} entries
        </div>

        <div className="candidatesPerPageDiv">
          Per Page
          <Select
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
            onClick={() => { perPageFun("1"); perPageFun(perPageValue) }}
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
  );
};
