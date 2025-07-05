import { Spin, Tooltip, Popover } from 'antd';
import "../../styles/dashboard/dashboardContactNotesList.css"
import moment from 'moment';
import ReportingManagerData from '../../popUps/clientPopUps/ReportingManagerData';


const DashboardContactNotesList = ({ isAllContactNoteList, isContactNoteLoader }: any) => {

  const getTitle = (data: any) => {
    return (
      <span className='createdForTitle whitespace-nowrap'>
        Created For <ReportingManagerData cell={data} /> 
      </span>
    )
  }

  const getContent = (data: any) => {
    const finalNextFollowUpDateTime = moment(data?.nextFollowUpDateTime).format("Do MMM YYYY, h:mm A")
    const finalUpdatedAt = moment(data?.updatedAt).tz('America/Chicago').format("Do MMM YYYY, h:mm A")
    const finalCreatedAt = moment(data?.createdAt).tz('America/Chicago').format("Do MMM YYYY, h:mm A")
    const noteTimeZone = data?.timezone
    return (
      <>
        <div className='nextFollowUp-section w-full shadow-3xl flex justify-between items-center py-[3%] px-[2%]'>
          <p className='xl:font-semibold xl:text-[13px] lg:font-medium lg:text-[11px]'>Next Follow Up:-</p>
          <p className='xl:font-semibold xl:text-[13px] lg:font-medium lg:text-[11px]'>{finalNextFollowUpDateTime != "Invalid date" ? `${finalNextFollowUpDateTime} ${noteTimeZone && `(${noteTimeZone})`}` : "--NA--"}</p>
        </div>
        <div className='lastFollowUp-section w-full shadow-3xl flex justify-between items-center py-[3%] px-[2%]'>
          <p className='xl:font-semibold xl:text-[13px] lg:font-medium lg:text-[11px]'>Last Follow Up:</p>
          <p className='xl:font-semibold xl:text-[13px] lg:font-medium lg:text-[11px]'>{finalUpdatedAt || "--NA--"} (CST)</p>
        </div>
        <div className='createdAt-section w-full shadow-3xl flex justify-between items-center py-[3%] px-[2%]'>
          <p className='xl:font-semibold xl:text-[13px] lg:font-medium lg:text-[11px]'>Created At:</p>
          <p className='xl:font-semibold xl:text-[13px] lg:font-medium lg:text-[11px]'>{finalCreatedAt || "--NA--"} (CST)</p>
        </div>
      </>
    )
  }


  return (
    <>
      <ul className="allNotehandler-ul">
        {isContactNoteLoader ? <Spin className="allContactNoteLoadre" /> :
          <>
            {isAllContactNoteList?.data?.length > 0 ? <>
              {
                isAllContactNoteList?.data?.map((noteList: any, index:any) => {
                  return (
                    <Popover key={index} overlayClassName="dashboardNotePopover-main" placement="left" title={() => getTitle(noteList)}
                      content={() => getContent(noteList)} //open={true}
                    >
                      <li className="li-For-createdBy-and-followUp-both">
                        <div className="createdBy-and-followUpNote-section">
                          <span className="createdByNameAndNote-container">
                            <i className="createdByWord ">Created By :-</i>
                            <span className="createdByNameWord">{noteList?.createdBy}</span>
                            <Tooltip color="#0E4D92" overlayClassName="createdByNameAndNote-tooltip" placement="top" title={noteList.noteSource == 0 ? "Incoming" : "Outgoing"}>
                              {noteList.noteSource === 0 ?
                                <b className="greenDotSymbol">&#x2022;</b> :
                                <b className="redDotSymbol">&#x2022;</b>}
                            </Tooltip>
                          </span>
                          <span className="dashBoardAllNotHandler">
                            {noteList.contactNoteLabels?.map((label: any) => {
                              if (label === "Interview Scheduled") {
                                return <span className="lableForInterviewScheduled">Interview Scheduled</span>
                              } else if (label === "Email Follow-Up") {
                                return <span className="lableForEmailFollow-Up">Email Follow-Up</span>
                              } else if (label === "Follow-up") {
                                return <span className="lableForFollow-Up">Follow-Up</span>
                              } else if (label === "Interview Done") {
                                return <span className="lableForInterviewDone">Interview Done</span>
                              } else if (label === "Submission") {
                                return <span className="lableForSubmission">Submission</span>
                              } else if (label === "Introduction") {
                                return <span className="lableForIntroduction">Introduction</span>
                              }
                            })}
                          </span>
                        </div>
                        <div className="main-note-section">"{noteList.note}"</div>
                      </li>
                    </Popover>
                  )
                })}
            </> : <>
              <div className='w-full h-full flex justify-center items-center text-3xl text-primary'>
                <h1>No Data Found</h1>
              </div>
            </>}
          </>
        }
      </ul>
    </>
  )
}

export default DashboardContactNotesList
