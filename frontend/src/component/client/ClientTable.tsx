import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  ColumnResizeMode,
  useReactTable,
} from "@tanstack/react-table";
import { Client } from "./ClientColumn.ts";
import { useDispatch, useSelector } from "react-redux";
import { FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";
import ContactMultiFilter from "../contacts/ContactMultiFilter.tsx";
import { useEffect, useMemo, useState } from "react";
import IndeterminateCheckbox from "./IndeterminateCheckbox.tsx";
import { FiEdit3 } from "react-icons/fi";
import { Space, Spin } from "antd";
import { BsExclamationOctagon } from "react-icons/bs";
import AddClientNotePopUp from "../../popUps/clientPopUps/AddClientNotePopUp.tsx";
import EditClientNotes from "./EditClientNotes.tsx";
import { MdNote } from "react-icons/md";
import {
  setClientStateData,
  setClientSelectedId,
  setClientAddNoteId,
} from "../../redux/clientSlice.ts";
import ClientNameDetails from "../../popUps/clientPopUps/ClientNameDetails.tsx";
import moment from "moment-timezone";
import React from "react";

const ClientTable = ({
  columnOrder,
  columnVisibility,
  setColumnVisibility,
  setColumnOrder,
  rowSelection,
  setRowSelection,
  setEditClientData,
  setAddClientModalOpen,
  isLoading,
}: any) => {
  const [editClientNotesModal, setEditClientNotesModal] = useState(false);
  const [clientSortType, setClientSortType] = useState(false);
  const [sortColumn, setSortColumn]: any = useState("");
  const [columnResizeMode, _setColumnResizeMode] =
    React.useState<ColumnResizeMode>("onChange");
  const [addNoteId, setAddNoteId] = useState({});
  const [clientId, setClientId] = useState([]);

  const { clientData, clientDataformat } = useSelector(
    (state: any) => state?.client
  );

  const columns = useMemo<ColumnDef<Client>[]>(
    () => [
      {
        id: "select",
        header: ({ table }: any) => (
          <span className=" flex items-center">
            <IndeterminateCheckbox
              className="h-[18px] w-[18px] accent-[#121820]"
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          </span>
        ),
        cell: ({ row }: any) => (
          <span className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </span>
        ),
      },

      { accessorKey: "id", header: "ID" },
      { accessorKey: "clientName", header: "Client Name" },
      { accessorKey: "websiteUrl", header: "Website" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "industry", header: "Industry" },
      { accessorKey: "city", header: "City" },
      { accessorKey: "state", header: "State" },
      { accessorKey: "country", header: "Country" },
      { accessorKey: "clientNotesData", header: "Notes" },
      { accessorKey: "paymentTerm", header: "Payment Terms" },
      { accessorKey: "clientStatus", header: "Client Status" },
      { accessorKey: "ownership", header: "Ownership" },
      { accessorKey: "createdBy", header: "Created By" },
      { accessorKey: "updatedBy", header: "Updated By" },
      { accessorKey: "createdAt", header: "Created At" },
      { accessorKey: "updatedAt", header: "Updated At" },
    ],
    []
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(clientData?.data);
  }, [clientData]);

  const { role } = useSelector((state: any) => state?.user?.userData);

  useEffect(() => {
    const clientColumnOrder: any = localStorage.getItem("clientColumnOrder");
    setColumnOrder(JSON.parse(clientColumnOrder));
  }, []);
  useEffect(() => {
    const clientColumnVisibillity: any = localStorage.getItem(
      "clientColumnVisibillity"
    );
    setColumnVisibility(JSON.parse(clientColumnVisibillity));
  }, []);

  const table: any = useReactTable({
    data: data || [],
    columns,
    state: {
      rowSelection,
      columnOrder,
      columnVisibility,
    },
    enableRowSelection: true,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    renderFallbackValue: null,
  });

  useEffect(() => {
    dispatch(
      setClientSelectedId(
        table?.getSelectedRowModel()?.flatRows?.map((e: any) => e?.original?.id)
      )
    );
  }, [rowSelection]);

  const dispatch = useDispatch();

  const handleSorting = (e: any) => {
    setClientSortType(!clientSortType);
    setSortColumn(e);
    dispatch(
      setClientStateData({
        ...clientDataformat,
        sortType: clientSortType ? "DESC" : "ASC",
        sortColumn: e,
      })
    );
  };

  return (
    <div className="w-full relative h-[85%]  overflow-auto">
      <table
        className="w-full h-auto"
        {...{
          style: {
            width: table.getCenterTotalSize(),
          },
        }}
      >
        <thead className="sticky top-0 z-20">
          {table?.getHeaderGroups()?.map((headerGroup: any) => (
            <tr
              className="bg-[#F2F2F2] py-3 h-[60px] border-b-[1.5px] border-s-[#F2F2F2]"
              key={headerGroup.id}
            >
              {headerGroup?.headers?.map((header: any) => {
                if (header?.id === "select") {
                  return (
                    <>
                      {role !== 1 && (
                        <th
                          {...{
                            key: header.id,
                            colSpan: header.colSpan,
                            style: {
                              width: header.getSize(),
                            },
                          }}
                          className="client-th relative p-[7px 10px 7px 32px] my-[10px]  text-start first:pl-8 max-w-[50px]"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      )}
                    </>
                  );
                }
                return (
                  <>
                    <th
                      {...{
                        key: header.id,
                        colSpan: header.colSpan,
                        style: {
                          width: header.getSize(),
                        },
                      }}
                      key={header.id}
                      className="client-head-th relative px-4 my-[10px] whitespace-nowrap text-start first:pl-8"
                    >
                      <span className="flex items-center gap-x-1">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header?.column?.id !== "select" &&
                          header?.column?.id !== "clientNotesData" && (
                            <ContactMultiFilter
                              tableData={clientData?.data}
                              column={header}
                            />
                          )}
                        {header?.column?.id !== "select" &&
                          header?.column?.id !== "clientNotesData" && (
                            <span
                              className="cursor-pointer"
                              onClick={() => handleSorting(header?.column?.id)}
                            >
                              {clientSortType &&
                              sortColumn === header?.column?.id ? (
                                <FaSortAmountUpAlt size={16} />
                              ) : (
                                <FaSortAmountDown size={16} />
                              )}
                            </span>
                          )}
                      </span>
                      <div
                        {...{
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: `resizer ${
                            header.column.getIsResizing() ? "isResizing" : ""
                          }`,
                          style: {
                            transform:
                              columnResizeMode === "onEnd" &&
                              header.column.getIsResizing()
                                ? `translateX(${
                                    table.getState().columnSizingInfo
                                      .deltaOffset
                                  }px)`
                                : "",
                          },
                        }}
                      />
                    </th>
                  </>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="relative">
          {!isLoading ? (
            table?.getRowModel()?.rows?.length > 0 ? (
              table?.getRowModel()?.rows?.map((row: any) => (
                <tr
                  className="py-4 border-b-[1.5px] h-[45.3px] md:h-[40px] border-s-[#F2F2F2]  hover:bg-slate-300"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row?.getVisibleCells()?.map((cell: any) => {
                    if (cell?.column?.id === "clientName") {
                      return (
                        <>
                          <td
                            {...{
                              key: cell.id,
                              style: {
                                maxWidth: cell.column.getSize(),
                              },
                            }}
                            key={row.id}
                            className="text-start py-2 px-[5px] whitespace-nowrap text-[14px] font-[600] flex items-center gap-x-[5px] text-[#F57C00]"
                          >
                            <span>
                              <ClientNameDetails cell={cell.row.original} />
                            </span>
                            <span className="min-w-[50px] w-max text-ellipsis overflow-hidden">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </span>
                            <span>
                            <FiEdit3
                              className="cursor-pointer text-[#121820]"
                              size={16}
                              onClick={() => {
                                setEditClientData(cell?.row?.original);
                                setAddClientModalOpen(true);
                              }}
                            />
                            </span>
                          </td>
                        </>
                      );
                    }
                    if (cell?.column?.id === "clientNotesData") {
                      if (
                        row?.original?.clientNotesData === "" ||
                        row?.original?.clientNotesData === null
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
                              className=" pl-[15px] overflow-hidden text-sm opacity-50"
                              onClick={() => {
                                setAddNoteId(row?.original);
                              }}
                            >
                              <AddClientNotePopUp addNoteId={addNoteId} />
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
                              onClick={() => {
                                setEditClientNotesModal(true);
                                setClientId(row?.original);
                                dispatch(setClientAddNoteId(row?.original?.id));
                              }}
                              key={row.id}
                              className="flex pl-[15px] items-center gap-x-2 py-2  whitespace-nowrap text-[14px] font-[600]"
                            >
                              <span
                                className="cursor-pointer"
                                onClick={() => {
                                  setEditClientNotesModal(true);
                                  setClientId(row?.original);
                                  dispatch(
                                    setClientAddNoteId(row?.original?.id)
                                  );
                                }}
                              >
                                <MdNote className={`text-[15px]`} />
                              </span>
                              <span className=" truncate cursor-pointer">
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </span>
                            </td>
                          </>
                        );
                      }
                    }
                    if (
                      cell?.column?.id === "createdAt" ||
                      cell?.column?.id === "updatedAt"
                    ) {
                      return (
                        <td
                          {...{
                            key: cell.id,
                            style: {
                              maxWidth: cell.column.getSize(),
                            },
                          }}
                          className="text-start py-2 px-4 h-[45.3px] min-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-[600]"
                        >
                          {`${moment(cell.getContext().getValue())
                            .tz("America/Chicago")
                            .format("Do MMM YYYY, h:mm A")} (CST)`}
                        </td>
                      );
                    } else {
                      if (cell?.column?.id === "select") {
                        return (
                          <>
                            {role !== 1 && (
                              <td
                                key={cell.id}
                                className="text-start py-2 px-4 h-[45.3px] max-w-max overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-[600] first:pl-7"
                              >
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </td>
                            )}
                          </>
                        );
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
                                className="text-start py-2 px-4  text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-[600] first:pl-8"
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
                                  className="text-start py-2 px-4  overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-[600] first:pl-8"
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
                    }
                  })}
                </tr>
              ))
            ) : (
              <tr className="">
                <td className="fixed left-[40vw] top-[45vh] h-[150px] w-[200px] flex items-center justify-center flex-col">
                  <BsExclamationOctagon size={50} />
                  <span className="whitespace-nowrap text-[22px] font-extrabold mt-4">
                    {" "}
                    No Data Found
                  </span>
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td className="fixed left-[50%] top-[55%]">
                <Space size="middle">
                  <Spin size="large" />
                </Space>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <EditClientNotes
        editClientNotesModal={editClientNotesModal}
        setEditClientNotesModal={setEditClientNotesModal}
        clientId={clientId}
      />
    </div>
  );
};

export default ClientTable;
