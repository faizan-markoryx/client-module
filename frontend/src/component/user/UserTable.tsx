import { useEffect, useState } from "react";
import { userSwitchAPI, userTableData } from "../../services/userServices";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CiEdit } from "react-icons/ci";
import "../../styles/UserTable.css";

import { Switch, Space, Spin } from "antd";
import EditUserPopUp from "../../popUps/EditUserPopUp";
import { useDispatch, useSelector } from "react-redux";
import { setUserTableAllData } from "../../redux/userSlice";
import { setPageRefresh } from "../../redux/loginSlice";

const UserTable = () => {
  const [data, setData] = useState([]);

  const [userEditModal, setUserEditModal] = useState(false);
  const [editUserData, setEditUserData] = useState({});
  const [_swichValue, setSwichValue] = useState(true);

  const [userLoader, setUserLoader] = useState(false)

  const dispatch = useDispatch();
  const select = useSelector((state: any) => state?.user?.refresh);
  const selectPage = useSelector((state: any) => state?.userTable);




  const userTableBody = {
    searchBy: "",
    page: selectPage?.page,
    perPage: selectPage?.perPage,
  };

  const callUserSearch = () => {
    setUserLoader(true)
    userTableData(userTableBody)
      .then((res: any) => {
        setData(res?.data?.data);
        dispatch(setUserTableAllData(res?.data));
        setUserLoader(false)
      })
  };

  useEffect(() => {
    callUserSearch();
  }, [select, selectPage?.page, selectPage?.perPage]);

  // const [userTableBody] = useState();

  type Person = {
    select: any;
    fullName: any;
    id: number;
    email: any;
    phone: any;
    role: any;
    activeStatus: any;
    action: any;
  };

  const columnHelper = createColumnHelper<Person>();


  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
    }),
    columnHelper.accessor("fullName", {
      header: "Name",
    }),
    columnHelper.accessor("email", {
      header: "Email",
    }),
    columnHelper.accessor("phone", {
      header: "Number",
    }),
    columnHelper.accessor("role", {
      header: "Role",
    }),
    columnHelper.accessor("activeStatus", {
      header: "Active Status",
    }),
    columnHelper.accessor("action", {
      header: "Action",
    }),
  ];



  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });



  const userSwitch = (value: any, row: any) => {
    setSwichValue(value)
    userSwitchAPI({
      id: row?.original?.id,
      status: value
    }).then(() => {
      dispatch(setPageRefresh())
    })
  }



  return (
    <>
      <div className="user-table-main-section h-[63vh] overflow-y-scroll">
        <table className="w-[100%]">
          <thead className="relative border border-[#F2F2F2] bg-[#F2F2F2]">
            {table.getHeaderGroups().map((headerGroup: any) => (
              <tr key={headerGroup.id} className="bg-[#F2F2F2]  h-[2.5rem] sticky top-[-1px] z-10">
                {headerGroup.headers.map((header: any) => (
                  <th
                    key={header.id}
                    className="pl-2 pr-2 text-start user-th text-[#121820]"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {
            data.length > 0 && !userLoader ? <>
              <tbody className="userBody">
                {table.getRowModel().rows.map((row: any) => {

                  return (
                    <tr
                      key={row.id}
                      className={!row?.original?.isActive ? "border border-b-[#cccccc] bg-[#F2F2F2] opacity-50 h-[43.6px]" : "border border-b-[#cccccc] h-[43.6px] hover:bg-[#E6EDF6]"}
                    >
                      {row.getVisibleCells().map((cell: any) => {

                        if (cell?.column?.id == "role") {
                          if (cell?.row?.original?.role == 0) {
                            return <td className="pl-2 pr-2 max-w-[250px] overflow-hidden">Admin</td>
                          }
                          else {
                            return <td className="pl-2 pr-2">Account Manager</td>
                          }
                        }
                        if (cell?.column?.id == "activeStatus") {
                          return (
                            <td className={row?.original?.isActive ? "userSwitchBut pl-2 pr-2 max-w-[250px] overflow-hidden" : "pl-2 pr-2 max-w-[250px] overflow-hidden"}>

                              {/* <button className="border border-black">Switch</button>
                           */}
                              <Space direction="vertical">
                                <Switch
                                  checked={row?.original?.isActive}
                                  onChange={(e: any) => userSwitch(e, row)}
                                  checkedChildren="ON"
                                  unCheckedChildren="OFF"
                                  defaultChecked
                                />
                              </Space>

                            </td>
                          );
                        }
                        if (cell?.column?.id == "action") {
                          return (
                            <td className="pr-2 pl-2 max-w-[250px] overflow-hidden">
                              <button
                                className={!row?.original?.isActive ? "cursor-not-allowed border shadow-sm rounded-xl flex justify-center items-center gap-2 border-[#cccccc] pl-2 pr-2" : "border shadow-sm rounded-xl flex justify-center items-center gap-2 border-[#cccccc] pl-2 pr-2"}
                                onClick={() => {
                                  if (row?.original?.isActive) {
                                    setUserEditModal(true);
                                    setEditUserData(row?.original);
                                  }
                                }}
                              >
                                <CiEdit /> Edit
                              </button>
                            </td>
                          );
                        } else {
                          return (
                            <td key={cell.id} className="pr-2 pl-2 max-w-[250px] overflow-hidden">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        }
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </> : <>
              <div className="usetSpinDiv relative left-[43vw] top-[20vh]">
                <Space size="middle">
                  <Spin size="large" />
                </Space>
              </div>
            </>
          }
        </table>
      </div>
      <EditUserPopUp
        setUserEditModal={setUserEditModal}
        userEditModal={userEditModal}
        editUserData={editUserData}
      />
    </>
  );
};

export default UserTable;