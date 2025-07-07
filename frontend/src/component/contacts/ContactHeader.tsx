import ContactsExport from "./ContactsExport";
import ContactsSearch from "./ContactsSearch";
import ContactsColumnAdjustment from "./ContactsColumnAdjustment";
import { Switch } from "antd";
import AddContactPopUp from "../../popUps/AddContactPopUp";
import DeleteButton from "./DeleteButton";
import { useDispatch, useSelector } from "react-redux";
import { setContactData, setOwnerData } from "../../redux/contactSlice";
import ResetFilter from "./ResetFilter";
import ContactChangeStatusPopUp from "../../popUps/ContactChangeStatusPopUp";
import { useState } from "react";
import ContactBulkActionPopUp from "../../popUps/contactPopUps/ContactBulkActionPopUp";

const ClientHeader = ({
  searchValue,
  setSearchValue,
  setColumnOrder,
  setColumnVisibility,
}: any) => {
  const { contactData }: any = useSelector((state: any) => state.contact);
  const dispatch: any = useDispatch();
  const { userData }: any = useSelector((state: any) => state.user);
  const [isColumnPopupModel, setIsColumnPopupModel]: any = useState(false);

  const isMultifilterOn = () => {
    return Object.values(contactData).map((ele: any) => {
      if (Array.isArray(ele)) {
        return ele?.length > 0 ? true : false;
      } else if (typeof ele === "object") {
        return ele?.startDate !== "" ? true : false;
      }
    });
  };

  const isOwner: any = localStorage.getItem("isOwnerData");

  return (
    <div className="bg-[#E6E6E6] w-full max-h-[50px] h-auto rounded-t-[10px] flex justify-between">
      <ContactsSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className="flex items-center justify-between gap-x-[12px]">
        <ContactChangeStatusPopUp />
        {userData?.role == 0 && <ContactBulkActionPopUp />}
        <ResetFilter
          setSearchValue={setSearchValue}
          isMultifilterOn={isMultifilterOn}
        />
        <ContactsColumnAdjustment
          setIsColumnPopupModel={setIsColumnPopupModel}
          isColumnPopupModel={isColumnPopupModel}
          setColumnOrder={setColumnOrder}
          setColumnVisibility={setColumnVisibility}
        />
        {userData?.role == 0 && (
          <>
            <ContactsExport />
            <DeleteButton />
          </>
        )}
        <AddContactPopUp />

        <Switch
          style={{
            backgroundColor: `${!JSON.parse(isOwner) ? "#A4A5A5" : "#00b282"}`,
            marginRight: "50px",
          }}
          checked={JSON.parse(isOwner)}
          onChange={(e: any) => {
            dispatch(setContactData({ ...contactData, isAllData: e, page: 1 }));
            dispatch(setOwnerData(e));
          }}
        />
      </div>
    </div>
  );
};

export default ClientHeader;
