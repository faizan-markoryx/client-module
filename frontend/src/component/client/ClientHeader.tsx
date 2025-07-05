import ClientAdd from "./ClientAdd";
import ClientExport from "./ClientExport";
import ClientSearch from "./ClientSearch";
import ClientColumnAdjustment from "./ClientColumnAdjustment";
import { Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setClientOwnerData } from "../../redux/clientSlice";
import ClientReset from "./ClientReset";

const ClientHeader = ({
  columnVisibility,
  columnOrder,
  setColumnVisibility,
  setColumnOrder,
  setEditClientData,
  setSearchData,
  searchData,
  editClientData,
  addClientModalOpen,
  setAddClientModalOpen,
}: any) => {
  const {clientDataformat} = useSelector(
    (state: any) => state?.client
  );
  const dispatch = useDispatch();
  const handleOwnerData = () => {
    dispatch(setClientOwnerData({...clientDataformat,isAllData:!clientDataformat?.isAllData,page:1,perPage:10}));
    localStorage.setItem("isClinetAllData", JSON.stringify(!clientDataformat?.isAllData));
  };

  const { role } = useSelector((state: any) => state?.user?.userData);

  return (
    <div className="bg-[#E6E6E6] w-full max-h-[50px] h-auto px-5  rounded-t-[10px] flex justify-between">
      <ClientSearch setSearchData={setSearchData} searchData={searchData} />

      <div className="flex items-center justify-between gap-x-[12px]">
        <ClientReset />
        <ClientColumnAdjustment
          columnOrder={columnOrder}
          columnVisibility={columnVisibility}
          setColumnOrder={setColumnOrder}
          setColumnVisibility={setColumnVisibility}
        />
        {role === 0 && <ClientExport />}
        <ClientAdd
          editClientData={editClientData}
          setEditClientData={setEditClientData}
          addClientModalOpen={addClientModalOpen}
          setAddClientModalOpen={setAddClientModalOpen}
        />
        <Switch
          style={{
            backgroundColor: `${!clientDataformat?.isAllData ? "#A4A5A5" : "#00b282"}`,
            marginRight: "50px",
          }}
          onChange={handleOwnerData}
          checked={clientDataformat?.isAllData}
        />
      </div>
    </div>
  );
};

export default ClientHeader;
