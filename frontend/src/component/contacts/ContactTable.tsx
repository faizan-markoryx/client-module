import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnResizeMode,
} from "@tanstack/react-table";
import { columns } from "./ContactsColumn";
import { Space, Spin } from "antd";
import "../../styles/contact/ContactsTable.css";
import { useDispatch, useSelector } from "react-redux";
import ContactMultiFilter from "./ContactMultiFilter";
import "../../styles/contact/multiFilter.css";
import React, { useEffect, useState } from "react";
import { setContactData, setSelectedId } from "../../redux/contactSlice";
import AllContactNotes from "./AllContactNotes";
import { BsExclamationOctagon } from "react-icons/bs";
import { FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
import ContactAddNote from "./ContactAddNote";
import { AiFillLinkedin } from "react-icons/ai";
import ContactNamesDetails from "../../popUps/clientPopUps/ContactNamesDetails";
import ReportingManagerData from "../../popUps/clientPopUps/ReportingManagerData";
import moment from "moment-timezone";

const ContactTable = ({
  isLoader,
  columnOrder,
  columnVisibility,
  setColumnVisibility,
  setColumnOrder,
}: any) => {
  const [rowSelection, setRowSelection]: any = useState({});
  const [sortType, setSortType]: any = useState(false);
  const [sortColumn, setSortColumn]: any = useState("");

  const { contactTableData, contactData }: any = useSelector(
    (state: any) => state.contact
  );
  const { userData }: any = useSelector((state: any) => state.user);
  const dispatch: any = useDispatch();
  const [columnResizeMode, _setColumnResizeMode] =
    React.useState<ColumnResizeMode>("onChange");

  const table: any = useReactTable({
    data: contactTableData,
    columns: columns(),
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
      columnOrder,
      columnVisibility,
    },
    enableRowSelection: true,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: setRowSelection,
    columnResizeMode,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  useEffect(() => {
    const contactColumnOrder: any = localStorage.getItem("contactColumnOrder");
    setColumnOrder(JSON.parse(contactColumnOrder));
  }, []);

  useEffect(() => {
    const contactColumnVisibillity: any = localStorage.getItem(
      "contactColumnVisibillity"
    );
    setColumnVisibility(JSON.parse(contactColumnVisibillity));
  }, []);

  useEffect(() => {
    dispatch(
      setSelectedId(
        table?.getSelectedRowModel().flatRows?.map((e: any) => e?.original?.id)
      )
    );
  }, [rowSelection]);

  const setAscDes = (e: any) => {
    setSortType(!sortType);
    setSortColumn(e);
    dispatch(
      setContactData({
        ...contactData,
        sortType: sortType ? "DESC" : "ASC",
        sortColumn: e,
      })
    );
  };

  return (
    <>
      <div className="w-full relative h-[85%]  overflow-auto">
        <table
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
          className="w-full h-auto"
        >
          <thead className="sticky top-0">
            {table.getHeaderGroups().map((headerGroup: any) => (
              <tr
                key={headerGroup.id}
                className="bg-[#F2F2F2] py-3 h-[60px] border-b-[1.5px] border-s-[#F2F2F2]"
              >
                {headerGroup.headers.map((header: any) => {
                  if (header.id === "select") {
                    return (
                      <>
                        {userData?.role == 0 && (
                          <th
                            {...{
                              key: header.id,
                              colSpan: header.colSpan,
                              style: {
                                width: header.getSize(),
                              },
                            }}
                            key={header.id}
                            // style={{ padding: "7px 10px 7px 32px" }}
                            className="client-th relative p-[7px 10px 7px 32px] my-[10px]  text-start first:pl-8 max-w-[50px]"
                          >
                            <span className="flex items-center gap-x-1 accent-[#121820]">
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                            </span>
                          </th>
                        )}
                      </>
                    );
                  } else if (header.id === "id") {
                    return (
                      <>
                        <th
                          {...{
                            key: header.id,
                            colSpan: header.colSpan,
                            style: {
                              maxWidth: header.getSize(),
                            },
                          }}
                          key={header.id}
                          className="px-4 relative my-[10px] text-start first:pl-8  max-w-[100px] text-ellipsis"
                        >
                          <span
                            className="th-span whitespace-nowrap"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}

                            <ContactMultiFilter
                              tableData={contactTableData}
                              column={header}
                            />
                            {header.column.columnDef.isFilter ? (
                              sortType && sortColumn === header.id ? (
                                <FaSortAmountUpAlt
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setAscDes(header.id)}
                                />
                              ) : (
                                <FaSortAmountDown
                                  style={{
                                    marginLeft: "5px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => setAscDes(header.id)}
                                />
                              )
                            ) : null}
                          </span>
                          <div
                            {...{
                              onMouseDown: header.getResizeHandler(),
                              onTouchStart: header.getResizeHandler(),
                              className: `resizer ${header.column.getIsResizing()
                                ? "isResizing"
                                : ""
                                }`,
                              style: {
                                transform:
                                  columnResizeMode === "onEnd" &&
                                    header.column.getIsResizing()
                                    ? `translateX(${table.getState().columnSizingInfo
                                      .deltaOffset
                                    }px)`
                                    : "",
                              },
                            }}
                          />
                        </th>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <th
                          {...{
                            key: header.id,
                            colSpan: header.colSpan,
                            style: {
                              maxWidth: header.getSize(),
                            },
                          }}
                          key={header.id}
                          // className="relative"
                          className="contact-head-th  relative px-4 my-[10px]  text-start first:pl-8"
                        >
                          <span
                            className="th-span whitespace-nowrap"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <>
                              <span className="overflow-hidden">
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                              </span>

                              {header.column.columnDef.isFilter ? (
                                <ContactMultiFilter
                                  tableData={contactTableData}
                                  column={header}
                                />
                              ) : null}
                              {header.column.columnDef.isSort ? (
                                sortType && sortColumn === header.id ? (
                                  <FaSortAmountUpAlt
                                    style={{
                                      minWidth: "1rem",
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => setAscDes(header.id)}
                                  />
                                ) : (
                                  <FaSortAmountDown
                                    style={{
                                      minWidth: "1rem",
                                      marginLeft: "5px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => setAscDes(header.id)}
                                  />
                                )
                              ) : null}
                            </>
                          </span>
                          <div
                            {...{
                              onMouseDown: header.getResizeHandler(),
                              onTouchStart: header.getResizeHandler(),
                              className: `resizer ${header.column.getIsResizing()
                                ? "isResizing"
                                : ""
                                }`,
                              style: {
                                transform:
                                  columnResizeMode === "onEnd" &&
                                    header.column.getIsResizing()
                                    ? `translateX(${table.getState().columnSizingInfo
                                      .deltaOffset
                                    }px)`
                                    : "",
                              },
                            }}
                          />
                        </th>
                      </>
                    );
                  }
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoader ? (
              <>
                <tr>
                  <td colSpan={columns.length} className="h-24 text-center">
                    <div className="fixed left-[50%] top-[55%]">
                      <Space size="middle">
                        <Spin size="large" />
                      </Space>
                    </div>
                  </td>
                </tr>
              </>
            ) : (
              <>
                {table.getRowModel().rows?.length > 0 ? (
                  table.getRowModel().rows.map((row: any) => (
                    <tr
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="py-4 border-b-[1.5px] border-s-[#F2F2F2]  hover:bg-slate-300"
                    >
                      {row.getVisibleCells().map((cell: any) => {
                        if (cell.column.id === "reportingManager") {
                          if (
                            row?.original?.reportingManager == "" ||
                            row?.original?.reportingManager == null
                          ) {
                            return (
                              <td
                                {...{
                                  key: cell.id,
                                  style: {
                                    width: cell.column.getSize(),
                                  },
                                }}
                                className="pl-[18px]"
                              >
                                --
                              </td>
                            );
                          } else {
                            return (
                              <>
                                <td
                                  {...{
                                    key: cell.id,
                                    style: {
                                      maxWidth: cell.column.getSize(),
                                    },
                                  }}
                                  className="px-4 "
                                >
                                  <ReportingManagerData
                                    cell={cell.row.original}
                                  />
                                </td>
                              </>
                            );
                          }
                        }
                        if (cell.column.id === "contactNote") {
                          if (row?.original?.contactNote === "") {
                            return (
                              <td
                                {...{
                                  key: cell.id,
                                  style: {
                                    maxWidth: cell.column.getSize(),
                                  },
                                }}
                                className="text-start py-2 px-3 h-[45.3px] whitespace-nowrap text-[14px] font-[600] first:pl-8"
                              >
                                <ContactAddNote row={row} />
                              </td>
                            );
                          } else {
                            return (
                              <>
                                <td
                                  {...{
                                    key: cell.id,
                                    style: {
                                      width: cell.column.getSize(),
                                    },
                                  }}
                                  key={cell.id}
                                  // className="contacts-table-body-td cursor-pointer"
                                  className="text-start py-2 px-4 max-h-4 h-[45.3px] text-[14px] font-[600] first:pl-8 flex items-center"
                                >
                                  <AllContactNotes row={row} cell={cell} />
                                </td>
                              </>
                            );
                          }
                        } else if (cell.column.id === "select") {
                          return (
                            <>
                              {userData?.role == 0 && (
                                <td
                                  key={cell.id}
                                  // className="contacts-table-body-td"
                                  className="text-start py-2 px-4 h-[45.3px] whitespace-nowrap text-[14px] font-[600] first:pl-8 accent-[#121820]"
                                  style={{
                                    padding: "7px 10px 7px 32px",
                                    maxWidth: "50px",
                                    minWidth: "50px",
                                  }}
                                >
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </td>
                              )}
                            </>
                          );
                        } else if (cell.column.id === "fullName") {
                          return (
                            <>
                              <td
                                {...{
                                  key: cell.id,
                                  style: {
                                    maxWidth: cell.column.getSize(),
                                  },
                                }}
                                key={cell.id}
                                className="text-start py-2 text-primary px-4 h-[45.3px] whitespace-nowrap text-[14px] font-[600] first:pl-8"
                              // style={{
                              //   padding: "7px 10px 7px 15px",
                              // }}
                              >
                                {cell.renderValue() === "" ||
                                  cell.renderValue() === null ||
                                  cell.renderValue() === undefined ? (
                                  <span className=" text-gray-400">--NA--</span>
                                ) : (
                                  <>
                                    <ContactNamesDetails
                                      cell={cell.row.original}
                                    />
                                  </>
                                )}
                              </td>
                            </>
                          );
                        } else if (cell.column.id === "id") {
                          return (
                            <>
                              <td
                                {...{
                                  key: cell.id,
                                  style: {
                                    maxWidth: cell.column.getSize(),
                                  },
                                }}
                                key={cell.id}
                                className="text-start py-2 px-4 h-[45.3px] whitespace-nowrap text-[14px] font-[600] first:pl-8"
                              // style={{
                              //   padding: "7px 10px 7px 15px",
                              //   maxWidth: "100px",
                              //   minWidth: "100px",
                              // }}
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </td>
                            </>
                          );
                        } else if (
                          cell.column.id === "createdAt" ||
                          cell.column.id === "updatedAt" ||
                          cell.column.id === "nextFollowUpDateTime" ||
                          cell.column.id === "lastFollowUpDate"
                        ) {
                          if (
                            cell.getContext().getValue() === "" ||
                            cell.getContext().getValue() === null
                          ) {

                            return (
                              <>
                                <td
                                  {...{
                                    key: cell.id,
                                    style: {
                                      maxWidth: cell.column.getSize(),
                                    },
                                  }}
                                  key={cell.id}
                                  className="contacts-table-body-td text-gray-400"
                                >
                                  --NA--
                                </td>
                              </>
                            );
                          }

                          return (
                            <>
                              <td
                                {...{
                                  key: cell.id,
                                  style: {
                                    maxWidth: cell.column.getSize(),
                                    padding: "7px 10px 7px 15px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  },
                                }}
                                key={cell.id}
                                className="text-start py-2 px-4 h-[45.3px] whitespace-nowrap text-[14px] font-[600] first:pl-8"
                              >
                                {cell.column.id === "nextFollowUpDateTime"
                                  ? `${moment(cell.getContext().getValue()).format(
                                    "Do MMM YYYY, h:mm A"
                                  )} (${cell?.row?.original?.nextFollowUpDateTimeTimezone})`
                                  : `${moment(cell.getContext().getValue())
                                    .tz("America/Chicago")
                                    .format("Do MMM YYYY, h:mm A")} (CST)`}
                              </td>
                            </>
                          );
                        } else if (cell.column.id === "linkedInProfile") {
                          if (
                            cell.renderValue() === "" ||
                            cell.renderValue() === null ||
                            cell.renderValue() === undefined
                          ) {
                            return (
                              <>
                                <td
                                  {...{
                                    key: cell.id,
                                    style: {
                                      maxWidth: cell.column.getSize(),
                                    },
                                  }}
                                  key={cell.id}
                                  className="contacts-table-body-td text-gray-400"
                                >
                                  --NA--
                                </td>
                              </>
                            );
                          } else {
                            return (
                              <>
                                <td
                                  {...{
                                    key: cell.id,
                                    style: {
                                      maxWidth: cell.column.getSize(),
                                    },
                                  }}
                                  key={cell.id}
                                  className="text-start py-2 px-4 h-[45.3px]  overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-[600] first:pl-8"
                                >
                                  <a href={cell.renderValue()} target="_blank">
                                    <AiFillLinkedin className="text-primary text-2xl " />
                                  </a>
                                </td>
                              </>
                            );
                          }
                        } else {
                          if (
                            cell.renderValue() === "" ||
                            cell.renderValue() === null ||
                            cell.renderValue() === undefined
                          ) {
                            return (
                              <>
                                <td
                                  {...{
                                    key: cell.id,
                                    style: {
                                      maxWidth: cell.column.getSize(),
                                    },
                                  }}
                                  key={cell.id}
                                  className="contacts-table-body-td text-gray-400"
                                >
                                  --NA--
                                </td>
                              </>
                            );
                          } else {
                            return (
                              <>
                                {
                                  <td
                                    {...{
                                      key: cell.id,
                                      style: {
                                        maxWidth: cell.column.getSize(),
                                      },
                                    }}
                                    key={cell.id}
                                    className="text-start py-2 px-4 h-[45.3px]  overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-[600] first:pl-8"
                                  >
                                    {flexRender(
                                      cell.column.columnDef.cell,
                                      cell.getContext()
                                    )}
                                  </td>
                                }
                              </>
                            );
                          }
                        }
                      })}
                    </tr>
                  ))
                ) : (
                  <tr className="relative">
                    <td className="absolute left-[43vw] top-[20vh] h-[150px] w-[200px] flex items-center justify-center flex-col">
                      <BsExclamationOctagon size={50} />
                      <span className="whitespace-nowrap text-[22px] font-extrabold mt-4">
                        {" "}
                        No Data Found
                      </span>
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ContactTable;
