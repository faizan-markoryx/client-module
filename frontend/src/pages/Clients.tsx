import { useEffect, useState } from "react";
import ClientHeader from "../component/client/ClientHeader";
import ClientTable from "../component/client/ClientTable";
import ClientPagination from "../component/client/ClientPagination";
import { getClientData } from "../services/clientServices";
import { setClientData } from "../redux/clientSlice";
import { useDispatch, useSelector } from "react-redux";
import { ColumnOrderState } from "@tanstack/react-table";

const Clients = () => {
  const [isLoading, setIsLoading]: any = useState(false);
  const [searchData, setSearchData] = useState("");
  const [editClientData, setEditClientData] = useState({});
  const [addClientModalOpen, setAddClientModalOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const { clientDataformat, clientRefresh } = useSelector(
    (state: any) => state?.client
  );

  const dispatch = useDispatch();

  const handleClientSearch = async (body: any) => {
    setIsLoading(true);
    await getClientData(body)
      .then((res: any) => {
        dispatch(setClientData(res?.data));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  
  useEffect(() => {
    if (searchData !== "") {
      const getData = setTimeout(() => {
        setRowSelection({});
        handleClientSearch({ ...clientDataformat, searchBy: searchData });
      }, 1000);

      return () => clearTimeout(getData);
    } else {
      setRowSelection({});
      handleClientSearch(clientDataformat);
    }
    
  }, [clientDataformat, clientRefresh, searchData]);

  return (
    <div className="mx-auto mt-[30px] w-[94%] h-[80%] bg-white shadow-3xl rounded-[10px]">
      <ClientHeader
        setColumnVisibility={setColumnVisibility}
        setColumnOrder={setColumnOrder}
        columnOrder={columnOrder}
        columnVisibility={columnVisibility}
        setSearchData={setSearchData}
        setEditClientData={setEditClientData}
        searchData={searchData}
        editClientData={editClientData}
        addClientModalOpen={addClientModalOpen}
        setAddClientModalOpen={setAddClientModalOpen}
      />
      <ClientTable
        columnOrder={columnOrder}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        setColumnOrder={setColumnOrder}
        setRowSelection={setRowSelection}
        rowSelection={rowSelection}
        setEditClientData={setEditClientData}
        setAddClientModalOpen={setAddClientModalOpen}
        isLoading={isLoading}
      />
      <ClientPagination />
    </div>
  );
};

export default Clients;
