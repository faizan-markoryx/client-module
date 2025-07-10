import { Pagination, Select } from "antd"
import { useDispatch, useSelector } from 'react-redux'
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { setContactData } from "../../redux/contactSlice";

const ContactPagination = () => {
const {Option} = Select;
const {contactData: contactDataObj, contactTablePagination:paginationData}:any = useSelector((state:any) => state.contact)
const dispatch:any = useDispatch();

const selectperPage = useSelector((state:any)=>state?.contact);


// console.log("paginationData",paginationData)

  return (
   <>
   <div className="candidateHotlistAntdPaginationMainDiv">
      <div className="showingPageination">
        Showing{" "}
        {paginationData?.totalRecords === 0
          ? 0
          : (paginationData?.currentPage - 1) * paginationData?.totalPerpage +
          1}{" "}
        to{" "}
        {paginationData?.totalRecords === 0
          ? 0
          : paginationData?.nextPage !== null
            ? paginationData?.totalPerpage * paginationData?.currentPage
            : paginationData?.totalRecords}{" "}
        of {paginationData?.totalRecords} entries
      </div>
      
      <div className="candidatesPerPageDiv">
        Per Page
        <Select
          defaultValue="10"
          value={selectperPage?.contactTablePagination?.totalPerpage}
          style={{ width: 55 }}
          onChange={(e:any) => dispatch(setContactData({...contactDataObj, perPage:e, page:1}))}
        >
          <Option value="10">10</Option>
          <Option value="20">20</Option>
          <Option value="50">50</Option>
          <Option value="100">100</Option>
        </Select>
      </div>

      <div className="userPaginationPages">

        <span className={paginationData?.currentPage === 1 ? "nex-prev-disable" : "nex-prev"} onClick={() => { if(paginationData?.currentPage !== 1 )   dispatch(setContactData({...contactDataObj, page:"1", 
        // perPage:"10"
        perPage:selectperPage?.contactTablePagination?.totalPerpage
        }))}}>
          <RxDoubleArrowLeft  />
        </span>
        <Pagination
          defaultCurrent={1}
          showQuickJumper
          pageSize={paginationData?.totalPerpage || 10}
          // current={searchAnyData?.length > 0 ? 1 : paginationData?.currentPage}
          current={paginationData?.currentPage}
          total={paginationData?.totalRecords}
          onChange={(e:any) => dispatch(setContactData({...contactDataObj, page:e}))}
        />

        <span className={paginationData?.currentPage === paginationData?.totalPage ? "nex-prev-disable" : "nex-prev"}
          onClick={() => { if(paginationData?.currentPage !== paginationData?.totalPage) dispatch(setContactData({...contactDataObj, page:paginationData.totalPage, 
          // perPage:"10"
          perPage:selectperPage?.contactTablePagination?.totalPerpage
          }))}} >
          <RxDoubleArrowRight />
        </span>

      </div>
    </div>
   </>
  )
}

export default ContactPagination