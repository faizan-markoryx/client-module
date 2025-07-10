import { DatePicker } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import dayjs from "dayjs";
import { setContactData } from "../../redux/contactSlice";
import { setClientStateData } from "../../redux/clientSlice";

const { RangePicker } = DatePicker;

const ContactDateFilter = ({ setIsFilterOn, state, column }: any) => {
  const [startDate, setStartDate]: any = useState(
    state?.[column.id]?.startDate || ""
  );
  const [endDate, setEndDate]: any = useState(
    state?.[column.id]?.endDate || ""
  );
  const dispatch: any = useDispatch();

  const handleMultiSearchSubmit = () => {
    if (location.pathname === "/contacts") {
      dispatch(
        setContactData({ ...state, [column.id]: { startDate, endDate } })
      );
    } else {
      dispatch(
        setClientStateData({ ...state, [column.id]: { startDate, endDate } })
      );
    }
    setIsFilterOn(false);
  };
  const dateFormat = "YYYY-MM-DD";
  const handleMultiClearBtn = () => {
    if (location.pathname === "/contacts") {
      dispatch(
        setContactData({
          ...state,
          [column.id]: { startDate: "", endDate: "" },
        })
      );
    } else {
      dispatch(
        setClientStateData({
          ...state,
          [column.id]: { startDate: "", endDate: "" },
        })
      );
    }
    setStartDate("");
    setEndDate("");
    setIsFilterOn(false);
  };

  // const disabledDate = (current: any) => {
  //   return current && current > moment().endOf("day");
  // };

  const today: any = moment().format(dateFormat);
  const prevMonth: any = moment().subtract(30, "days").format(dateFormat);

  function handleTodayClick() {
    const today = moment().format(dateFormat);
    setStartDate(today);
    setEndDate(today);
  }

  function handleYesterdayClick() {
    const yesterday = moment().subtract(1, "day").format(dateFormat);
    setStartDate(yesterday);
    setEndDate(yesterday);
  }

  function handleWeekClick() {
    const startOfWeek = moment().startOf("week").format(dateFormat);
    const endOfWeek = moment().endOf("week").format(dateFormat);
    setStartDate(startOfWeek);
    setEndDate(endOfWeek);
  }

  function handleMonthClick() {
    const startOfMonth = moment().startOf("month").format(dateFormat);
    const endOfMonth = moment().endOf("month").format(dateFormat);
    setStartDate(startOfMonth);
    setEndDate(endOfMonth);
  }

  function handleYearClick() {
    const startOfYear = moment().startOf("year").format(dateFormat);
    const endOfYear = moment().endOf("year").format(dateFormat);
    setStartDate(startOfYear);
    setEndDate(endOfYear);
  }

  return (
    <div className="filter-box">
      <div className="filter-arrow"></div>
      <div className="filter-body !w-[250px]">
        <div className="input-search relative">
          <RangePicker
            defaultPickerValue={[dayjs(prevMonth), dayjs(today)]}
            value={
              startDate === ""
                ? [startDate, endDate]
                : [dayjs(startDate), dayjs(endDate)]
            }
            // disabledDate={disabledDate}
            allowEmpty={[true, true]}
            className="custom-date-picker"
            format={dateFormat}
            onChange={(_e: any, value: any) => {
              setStartDate(value?.[0]);
              setEndDate(value?.[1]);
            }}
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
            }}
          />
        </div>
        <div className="input-check-div text-[15px] text-[#121820]">
          <div className="flex justify-around mt-5">
            <button className="submit-btn" onClick={handleMultiSearchSubmit}>
              submit
            </button>
            <button className="clear-btn" onClick={handleMultiClearBtn}>
              clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDateFilter;
