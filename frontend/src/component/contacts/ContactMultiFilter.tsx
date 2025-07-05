import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { contactMultiSearch } from "../../services/contactServices";
import { Spin } from "antd";
import { setContactData } from "../../redux/contactSlice";
import ContactDateFilter from "./ContactDateFilter";
import { getClientData } from "../../services/clientServices";
import { setClientStateData } from "../../redux/clientSlice";

const ContactMultiFilter = ({ tableData, column }: any) => {
  const [loader, setLoader] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [searchInputData, setSearchInputData] = useState("");
  const [uniqueColumnData, setUniqueColumnData]: any = useState([]);
  const [selectedData, setSelectedData]: any = useState([]);
  const location: any = useLocation();
  const flitterRef: any = useRef(null);
  const contactState: any = useSelector(
    (state: any) => state.contact.contactData
  );
  const { clientDataformat }: any = useSelector((state: any) => state.client);
  const dispatch: any = useDispatch();

  const columnData = () => {
    let arr: any = [];
    if (searchInputData.length > 0) {
      searchedData?.map((e: any) => {
        if (e?.[column.id] !== "" || e?.[column.id] !== null) {
          if (!arr.includes(e?.[column.id])) {
            arr.push(e?.[column.id]);
          } else {
            arr = arr?.filter((e: any) => e !== e?.[column.id]);
          }
        }
      });
    } else {
      tableData?.map((e: any) => {
        if (e?.[column.id] === "" || e?.[column.id] === null) {
          return;
        } else {
          if (!arr.includes(e?.[column.id])) {
            arr.push(e?.[column.id]);
          } else {
            arr = arr?.filter((e: any) => e !== e?.[column.id]);
          }
        }
      });
    }
    setUniqueColumnData(arr);
  };

  useEffect(() => {
    if (searchInputData.length > 0) {
      setLoader(true);
      const Bounce = setTimeout(
        () =>
          location.pathname === "/contacts"
            ? contactMultiSearch({
                ...contactState,
                searchField: column.id,
                searchBy: searchInputData,
                page: 1,
                perPage: 10,
              }).then((res: any) => {
                if (res.data.data.length === 0) {
                  setUniqueColumnData([]);
                } else {
                  setSearchedData(res.data.data);
                }
                setLoader(false);
              })
            : getClientData({
                ...clientDataformat,
                searchField: column.id,
                searchBy: searchInputData,
                page: 1,
                perPage: 10,
              }).then((res: any) => {
                if (res.data.data.length === 0) {
                  setUniqueColumnData([]);
                } else {
                  setSearchedData(res.data.data);
                }
                setLoader(false);
              }),
        800
      );
      return () => clearTimeout(Bounce);
    } else {
      setLoader(false);
    }
  }, [searchInputData]);

  useEffect(() => {
    if (isFilterOn) {
      columnData();
    }
  }, [isFilterOn, searchedData, searchInputData, tableData]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [flitterRef, contactState, clientDataformat]);

  const handleClickOutside = (event: any) => {
    if (flitterRef.current && !flitterRef.current.contains(event.target)) {
      if (
        event?.target.classList.value?.substr(0, 10) === "ant-picker" ||
        event?.target?.className === "date-custom"
      ) {
        return;
      }
      setIsFilterOn(false);
      if (
        contactState?.[column.id]?.length === 0 &&
        location.pathname === "/contacts"
      ) {
        setSelectedData([]);
        setSearchInputData("");
      } else if (
        clientDataformat?.[column.id]?.length === 0 &&
        location.pathname === "/clients"
      ) {
        setSelectedData([]);
        setSearchInputData("");
      }
    }
  };

  const selectAllFunc = () => {
    if (uniqueColumnData.length !== selectedData.length) {
      setSelectedData(uniqueColumnData);
    } else {
      setSelectedData([]);
    }
  };

  const inputCheckFunc = (value: any) => {
    if (!selectedData.includes(value)) {
      setSelectedData([...selectedData, value]);
    } else {
      setSelectedData(selectedData.filter((e: any) => e !== value));
    }
  };

  const handleMultiSearchSubmit = () => {
    const idData: any = searchInputData.length > 0 ? searchedData : tableData;
    const createdByIDs = () => {
      let Arr: any = [];
      idData?.map((e: any) => {
        if (column.id === "createdBy") {
          if (selectedData?.includes(e?.createdBy)) {
            if (!Arr.includes(e?.createdId)) {
              Arr = [...Arr, e?.createdId];
            }
          }
        } else if (column.id === "ownership") {
          if (selectedData?.includes(e?.ownership)) {
            if (!Arr.includes(e?.ownershipId)) {
              Arr = [...Arr, e?.ownershipId];
            }
          }
        } else if (column.id === "updatedBy") {
          if (selectedData?.includes(e?.updatedBy)) {
            if (!Arr.includes(e?.updatedId)) {
              Arr = [...Arr, e?.updatedId];
            }
          }
        } else if (column.id === "reportingManager") {
          if (selectedData?.includes(e?.reportingManager)) {
            if (!Arr.includes(e?.reportingManagerId)) {
              Arr = [...Arr, e?.reportingManagerId];
            }
          }
        }
      });
      return Arr;
    };

    if (location.pathname === "/contacts") {
      if (
        column.id === "createdBy" ||
        column.id === "ownership" ||
        column.id === "updatedBy" ||
        column.id === "reportingManager"
      ) {
        dispatch(
          setContactData({
            ...contactState,
            [column.id]: createdByIDs(),
            page: 1,
            perPage: 10,
          })
        );
      } else {
        dispatch(
          setContactData({
            ...contactState,
            [column.id]: selectedData,
            page: 1,
            perPage: 10,
          })
        );
      }
    } else {
      if (
        column.id === "createdBy" ||
        column.id === "ownership" ||
        column.id === "updatedBy"
      ) {
        dispatch(
          setClientStateData({
            ...clientDataformat,
            [column.id]: createdByIDs(),
            page: 1,
            perPage: 10,
          })
        );
      } else {
        dispatch(
          setClientStateData({
            ...clientDataformat,
            [column.id]: selectedData,
            page: 1,
            perPage: 10,
          })
        );
      }
    }

    setSearchInputData("");
    setIsFilterOn(false);
  };

  const handleMultiClearBtn = () => {
    if (location.pathname === "/contacts") {
      dispatch(setContactData({ ...contactState, [column.id]: [] }));
    } else {
      dispatch(setClientStateData({ ...clientDataformat, [column.id]: [] }));
    }
    setSearchInputData("");
    setSelectedData([]);
  };

  return (
    <>
      <span className="muli-warp-span" ref={flitterRef}>
        {location.pathname === "/contacts" ? (
          column.id === "createdAt" ||
          column.id === "updatedAt" ||
          column.id === "nextFollowUpDateTime" ||
          column.id === "lastFollowUpDate" ? (
            contactState?.[column.id]?.startDate !== "" ? (
              <FaFilter
                className={
                  "cursor-pointer text-[rgb(149, 149, 149)] text-[14px] ml-[5px]"
                }
                onClick={() => setIsFilterOn(!isFilterOn)}
              />
            ) : (
              <FaFilter
                className={"cursor-pointer text-[#b9b9b9] text-[14px] ml-[5px]"}
                onClick={() => setIsFilterOn(!isFilterOn)}
              />
            )
          ) : contactState?.[column.id]?.length > 0 ? (
            <FaFilter
              className={
                "cursor-pointer text-[rgb(149, 149, 149)] text-[14px] ml-[5px]"
              }
              onClick={() => setIsFilterOn(!isFilterOn)}
            />
          ) : (
            <FaFilter
              className={"cursor-pointer text-[#b9b9b9] text-[14px] ml-[5px]"}
              onClick={() => setIsFilterOn(!isFilterOn)}
            />
          )
        ) : column.id === "createdAt" || column.id === "updatedAt" ? (
          clientDataformat?.[column.id]?.startDate !== "" ? (
            <FaFilter
              className={
                "cursor-pointer text-[rgb(149, 149, 149)] text-[14px] ml-[5px]"
              }
              onClick={() => setIsFilterOn(!isFilterOn)}
            />
          ) : (
            <FaFilter
              className={"cursor-pointer text-[#b9b9b9] text-[14px] ml-[5px]"}
              onClick={() => setIsFilterOn(!isFilterOn)}
            />
          )
        ) : clientDataformat?.[column.id]?.length > 0 ? (
          <FaFilter
            className={
              "cursor-pointer text-[rgb(149, 149, 149)] text-[14px] ml-[5px]"
            }
            onClick={() => setIsFilterOn(!isFilterOn)}
          />
        ) : (
          <FaFilter
            className={"cursor-pointer text-[#b9b9b9] text-[14px] ml-[5px]"}
            onClick={() => setIsFilterOn(!isFilterOn)}
          />
        )}

        {isFilterOn &&
        column.id !== "createdAt" &&
        column.id !== "updatedAt" &&
        column.id !== "nextFollowUpDateTime" &&
        column.id !== "lastFollowUpDate" ? (
          <div className="filter-box">
            <div className="filter-arrow"></div>
            <div className="filter-body l-[-70px] z-10">
              <div className="input-search relative">
                <BsSearch
                  className={
                    "text-[rgb(148, 148, 148)] absolute top-[7px] left-[5px]"
                  }
                />
                <input
                  value={searchInputData}
                  className="outline-none"
                  placeholder="search here..."
                  type="text"
                  onChange={(e: any) => setSearchInputData(e.target.value)}
                />
              </div>
              <div className="input-check-div text-[15px] text-[#265f9d]">
                <div className="select-all py-2 flex gap-2">
                  <input
                    checked={
                      selectedData.length > 0 &&
                      uniqueColumnData.length === selectedData.length
                        ? true
                        : false
                    }
                    id="allcheck"
                    type="checkbox"
                    onChange={() => {
                      selectAllFunc();
                    }}
                  />
                  <label htmlFor="allcheck">Select All</label>
                </div>
                <div className="input-data flex flex-col text-black  max-h-[200px] overflow-y-scroll">
                  {uniqueColumnData?.length > 0 && !loader ? (
                    uniqueColumnData.map((data: any, index: any) => {
                      return (
                        <div className="flex gap-2">
                          <input
                            checked={selectedData.includes(data)}
                            id={index}
                            type="checkbox"
                            onChange={() => inputCheckFunc(data)}
                          />
                          <label htmlFor={index}>{data}</label>
                        </div>
                      );
                    })
                  ) : loader ? (
                    <Spin tip="Loading" />
                  ) : (
                    "No Data Found"
                  )}
                </div>
                <div className="flex justify-around mt-5">
                  <button
                    className="submit-btn"
                    onClick={handleMultiSearchSubmit}
                  >
                    submit
                  </button>
                  <button className="clear-btn" onClick={handleMultiClearBtn}>
                    clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : isFilterOn ? (
          <ContactDateFilter
            state={
              location.pathname === "/contacts"
                ? contactState
                : clientDataformat
            }
            column={column}
            setIsFilterOn={setIsFilterOn}
          />
        ) : null}
      </span>
    </>
  );
};

export default ContactMultiFilter;
