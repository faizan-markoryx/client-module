import { Pagination, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/client.css";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { setClientPagination } from "../../redux/clientSlice";

const ClientPagination = () => {
  const clientPagination = useSelector(
    (state: any) => state?.client?.clientData?.pagination
  );

  const { Option } = Select;
  const dispatch = useDispatch();

  const handlePage = (e: any) => {
    dispatch(setClientPagination({ page: e }));
  };

  const handlePerPage = (e: any) => {
    dispatch(setClientPagination({ perPage: e }));
  };

  return (
    <div className="clientsAntdPaginationMainDiv">
      <div className="showingPageination">
        Showing{" "}
        {clientPagination?.totalRecords === 0
          ? 0
          : (clientPagination?.currentPage - 1) *
              clientPagination?.totalPerpage +
            1}{" "}
        to{" "}
        {clientPagination?.totalRecords === 0
          ? 0
          : clientPagination?.nextPage !== null
          ? clientPagination?.totalPerpage * clientPagination?.currentPage
          : clientPagination?.totalRecords}{" "}
        of {clientPagination?.totalRecords} entries
      </div>
      <div className="candidatesPerPageDiv">
        Per Page
        <Select
          value={clientPagination?.totalPerpage}
          style={{ width: 55 }}
          onChange={handlePerPage}
        >
          <Option value={10}>10</Option>
          <Option value={20}>20</Option>
          <Option value={50}>50</Option>
          <Option value={100}>100</Option>
        </Select>
      </div>
      <div className="paginationMainDiv">
        <span
          className={
            clientPagination?.currentPage === 1
              ? "nex-prev-disable"
              : "nex-prev"
          }
          onClick={() => {
            if (clientPagination?.currentPage !== 1) {
              dispatch(setClientPagination({ page: 1 }));
            }
          }}
        >
          <RxDoubleArrowLeft />
        </span>
        <Pagination
          defaultCurrent={1}
          showQuickJumper
          pageSize={clientPagination?.totalPerpage || 10}
          // current={searchAnyData?.length > 0 ? 1 : clientPagination?.currentPage}
          current={clientPagination?.currentPage}
          total={clientPagination?.totalRecords}
          onChange={handlePage}
        />
        <span
          className={
            clientPagination?.currentPage === clientPagination?.totalPage
              ? "nex-prev-disable"
              : "nex-prev"
          }
          onClick={() => {
            if (clientPagination?.currentPage !== clientPagination?.totalPage) {
              dispatch(
                setClientPagination({ page: clientPagination?.totalPage })
              );
            }
          }}
        >
          <RxDoubleArrowRight />
        </span>
      </div>
    </div>
  );
};

export default ClientPagination;
