import { Select } from 'antd';
import { DatePicker, Space } from 'antd';
import "../../styles/dashboard/searchByUsersAndDateFilter.css"
import { useEffect, useState } from 'react';
import Http from '../../services/http';
import moment from 'moment';
import dayjs from 'dayjs';
// import { getAllnotes } from '../../services/dashboard';

const SearchByUsersAndDateFilter = ({ noteBody, setNoteBody, page, perPage, isContactNoteLoader, setIsContactNoteLoader, setIsAllContactNoteList, setPage, setPerPage }: any) => {
  const [userOptions, setUserOptions]: any = useState([])
  const { RangePicker } = DatePicker;
  // const [startDate, setStartDate]: any = useState(
  //   state?.[column.id]?.startDate || ""
  // );
  // const [endDate, setEndDate]: any = useState(
  //   state?.[column.id]?.endDate || ""
  // );




  useEffect(() => {
    setIsContactNoteLoader(true)
    const body = {
      updatedAt: noteBody?.updatedAt,
      createdBy: noteBody?.createdBy,
      page: page,
      perPage: perPage,
      isExport: noteBody.isExport,
    }

    Http.post("dashboard/all-contact-note-list", body, false).then((res: any) => {
      if (res.success) {
        setIsAllContactNoteList(res.data)
        setIsContactNoteLoader(false)
      } else {
        setIsContactNoteLoader(false)

      }
    }).catch(() => {
      setIsContactNoteLoader(false)
    })

  }, [noteBody, page, perPage])

  useEffect(() => {
    getUserListData()
  }, [])

  const getUserListData = () => {
    setIsContactNoteLoader(true)
    Http.get("user/get-user-list", false).then((res: any) => {
      setIsContactNoteLoader(false)
      const options = res?.data?.map((userData: any) => {
        return {
          value: userData.id,
          label: userData.fullName,
        }
      });
      setUserOptions(options)
    }).catch(() => {
      setIsContactNoteLoader(false)
    })
  }

  const handleUserSelect = (value: any) => {
    if (value.length > 0) {
      setNoteBody({ ...noteBody, createdBy: value })
      setPage(1)
      setPerPage(10)
    } else {
      setNoteBody({ ...noteBody, createdBy: [] })
    }
  }

  const handleDatePicker = (_e: any, ele: any) => {
    setNoteBody({
      ...noteBody,
      updatedAt: {
        startDate: ele[0],
        endDate: ele[1]
      }
    })
  }

  const dateFormat = "YYYY-MM-DD";


  function handleTodayClick() {
    const today = moment().format(dateFormat);
    setNoteBody({
      ...noteBody,
      updatedAt: {
        startDate: today,
        endDate: today
      }
    })
  }

  function handleYesterdayClick() {
    const yesterday = moment().subtract(1, "day").format(dateFormat);
    setNoteBody({
      ...noteBody,
      updatedAt: {
        startDate: yesterday,
        endDate: yesterday
      }
    })
  }

  function handleWeekClick() {
    const startOfWeek = moment().startOf("week").format(dateFormat);
    const endOfWeek = moment().endOf("week").format(dateFormat);
    setNoteBody({
      ...noteBody,
      updatedAt: {
        startDate: startOfWeek,
        endDate: endOfWeek
      }
    })
  }

  function handleMonthClick() {
    const startOfMonth = moment().startOf("month").format(dateFormat);
    const endOfMonth = moment().endOf("month").format(dateFormat);
    setNoteBody({
      ...noteBody,
      updatedAt: {
        startDate: startOfMonth,
        endDate: endOfMonth
      }
    })
  }

  function handleYearClick() {
    const startOfYear = moment().startOf("year").format(dateFormat);
    const endOfYear = moment().endOf("year").format(dateFormat);
    setNoteBody({
      ...noteBody,
      updatedAt: {
        startDate: startOfYear,
        endDate: endOfYear
      }
    })
  }

  

  return (
    <div className="dashboardSaearchByUsers-main-container">
      <Select
        // showSearch={true}
        className='dashboard-searchByUser-input'
        placeholder={"Search By Users"}
        mode="tags"
        style={{ width: '50%' }}
        tokenSeparators={[',']}
        options={userOptions}
        onChange={handleUserSelect}
        loading={isContactNoteLoader}
        filterOption={(input: any, option: any) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }

      />
      <Space direction="vertical" size={12}>
        <RangePicker
          value={
            noteBody?.updatedAt.startDate === ""
              ? [noteBody?.updatedAt.startDate, noteBody?.updatedAt.endDate]
              : [dayjs(noteBody?.updatedAt.startDate), dayjs(noteBody?.updatedAt.endDate)]
          }
          onChange={(e: any, ele: any) => handleDatePicker(e, ele)}
          renderExtraFooter={() => {
            return (
              <div className="flex items-center justify-between px-3 text-primary">
                <button className="date-custom" onClick={handleTodayClick}>Today</button>
                <button
                  className="date-custom"
                  onClick={handleYesterdayClick}
                >
                  Yesterday
                </button>
                <button className="date-custom" onClick={handleWeekClick}>
                  Week
                </button>
                <button className="date-custom" onClick={handleMonthClick}>
                  Month
                </button>
                <button className="date-custom" onClick={handleYearClick}>
                  Year
                </button>
              </div>
            );
          }} />
      </Space>
    </div>
  )
}

export default SearchByUsersAndDateFilter
