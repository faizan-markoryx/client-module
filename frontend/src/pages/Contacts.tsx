import ContactsHeader from "../component/contacts/ContactHeader";
import ContactsTable from "../component/contacts/ContactTable";
import ContactsPagination from "../component/contacts/ContactPagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setContactTableData,
  setContactTablePagination,
} from "../redux/contactSlice";
import { message } from "antd";
import { ColumnOrderState } from "@tanstack/react-table";
import { contactMultiSearch } from "../services/contactServices";

const Contacts = () => {
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const contactObj: any = useSelector(
    (state: any) => state.contact.contactData
  );
  const dispatch: any = useDispatch();
  const [isLoader, setIsLoader]: any = useState(false);

  console.log("contactObj>>>",contactObj)

  useEffect(() => {
    if (searchValue.length !== 0) {
      const bounce = setTimeout(() => {
        const isOwner: any = localStorage.getItem("isOwnerData");
        setIsLoader(true);
        const body: any = {
          ...contactObj,
          isAllData: JSON.parse(isOwner),
          searchBy: searchValue,
          page: contactObj?.page,
        };
        contactMultiSearch(body)
          .then((res: any) => {
            if (res.success) {
              dispatch(setContactTableData(res.data.data));
              dispatch(setContactTablePagination(res.data.pagination));
              setIsLoader(false);
            }
          })
          .catch((err: any) => {
            message.error(err.message);
          });
      }, 800);

      return () => clearTimeout(bounce);
    } else {
      const isOwner: any = localStorage.getItem("isOwnerData");
      setIsLoader(true);
      const body: any = {
        ...contactObj,
        isAllData: JSON.parse(isOwner),
      };
      contactMultiSearch(body)
        .then((res: any) => {
          if (res.success) {
            dispatch(setContactTableData(res.data.data));
            dispatch(setContactTablePagination(res.data.pagination));
            setIsLoader(false);
          }
        })
        .catch((err: any) => {
          message.error(err.message);
        });
    }
  }, [contactObj, searchValue]);

  return (
    <>
      <div className="mx-auto mt-[30px] w-[94%] h-[80%] bg-white shadow-3xl rounded-[10px]">
        <ContactsHeader
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setColumnOrder={setColumnOrder}
          setColumnVisibility={setColumnVisibility}
        />
        <ContactsTable
          isLoader={isLoader}
          columnOrder={columnOrder}
          columnVisibility={columnVisibility}
          setColumnVisibility={setColumnVisibility}
          setColumnOrder={setColumnOrder}
        />
        <ContactsPagination />
      </div>
    </>
  );
};

export default Contacts;
