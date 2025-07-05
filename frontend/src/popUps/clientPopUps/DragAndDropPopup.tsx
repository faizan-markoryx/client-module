import { useEffect, useState } from "react";
import { Modal } from "antd";
import "../../styles/client/DragAndDropPopup.css";
import { RxCross2, RxDragHandleDots2 } from "react-icons/rx";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ColumnLogo from "../../assets/ColumnLogo";

const DragAndDropPopup = ({
  setColumnVisibility,
  dragAndDropModal,
  setDragAndDropModal,
  setColumnOrder,
}: any) => {
  const [selectedColumns, setSelectedColumns]: any = useState([
    { accessorKey: "select", header: "Select" },
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
  ]);
  const [finalColumns, setFinalColumns]: any = useState([]);
  const [hiddenColumns, setHiddenColumns]: any = useState([]);

  const handleColumnChange = (result: any) => {
    if (!result.destination) {
      return;
    }
    const list: any = Array.from(selectedColumns);
    const [removed] = list.splice(result.source.index, 1);
    list.splice(result.destination.index, 0, removed);
    setSelectedColumns(list);
    setFinalColumns(list.map((d: any) => d?.accessorKey));
  };

  const handleApply = () => {
    const hideCol: any = {};
    hiddenColumns.map((item: any) => {
      hideCol[item] = false;
      return hideCol;
    });
    setColumnOrder(finalColumns);
    setColumnVisibility(hideCol);
    localStorage.setItem("clientColumnOrder", JSON.stringify(finalColumns));
    localStorage.setItem("clientColumnVisibillity", JSON.stringify(hideCol));
    setDragAndDropModal(false);
  };

  const clientColumnReset = () => {
    localStorage.setItem("clientColumnOrder", JSON.stringify([]));
    localStorage.setItem("clientColumnVisibillity", JSON.stringify({}));
    setColumnOrder([]);
    setColumnVisibility({});
    setDragAndDropModal(false);
    setHiddenColumns([]);
    setSelectedColumns([
      { accessorKey: "select", header: "Select" },
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
    ]);
  };

  const clientColumnOrder: any = localStorage.getItem("clientColumnOrder");
  const clientColumnOrderData =
    clientColumnOrder && JSON.parse(clientColumnOrder || []);
  const clientColumnVisibillity: any = localStorage.getItem(
    "clientColumnVisibillity"
  );
  const clientColumnVisibillityData: any =
    clientColumnVisibillity && JSON.parse(clientColumnVisibillity || {});

  useEffect(() => {
    if (!dragAndDropModal) return;
    if (clientColumnOrder && clientColumnOrderData?.length > 0) {
      const newArray = clientColumnOrderData.map((key: any) => {
        return selectedColumns.find((obj: any) => obj?.accessorKey === key);
      });
      setSelectedColumns(newArray);
    } else {
      setSelectedColumns([
        { accessorKey: "select", header: "Select" },
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
      ]);
    }
  }, [dragAndDropModal]);

  useEffect(() => {
    if (!dragAndDropModal) return;

    if (
      clientColumnVisibillity &&
      Object?.keys(clientColumnVisibillityData)?.length > 0
    ) {
      setHiddenColumns(Object?.keys(clientColumnVisibillityData));
    } else {
      setHiddenColumns([]);
    }
  }, [dragAndDropModal]);

  return (
    <Modal
      footer={null}
      className="drag-and-drop-client-modal"
      open={dragAndDropModal}
      onOk={() => setDragAndDropModal(false)}
    onCancel={() => setDragAndDropModal(false)}
    >
      <div className="h-[3.5rem] flex items-center justify-between pt-2 pl-8 pr-2 ">
        <div className="flex items-center gap-4">
          <ColumnLogo className={"text-[30px]"} />

          <h1 className="text-[16px] text-[#292828] font-semibold">Column Settings</h1>
        </div>
        <div onClick={() => setDragAndDropModal(false)}>
          <RxCross2 className="text-xl cursor-pointer text-[grey]" />
        </div>
      </div>
      <div className="h-[28rem] overflow-x-hidden overflow-scroll border-t border-[#bbbbbb] ">
        <DragDropContext onDragEnd={handleColumnChange}>
          <Droppable droppableId="1">
            {(provided: any) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {selectedColumns.map((value: any, index: any) => {
                  if (
                    value?.accessorKey === "id" ||
                    value?.accessorKey === "select" ||
                    !value?.accessorKey
                  ) {
                    return;
                  }
                  return (
                    <>
                      <Draggable
                        draggableId={value.accessorKey}
                        key={value.accessorKey}
                        index={index}
                      >
                        {(provided: any) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            key={index}
                            className="flex items-center w-[15rem] h-[3rem] gap-2 pl-10"
                          >
                            <RxDragHandleDots2 className="text-xl " />
                            <input
                              className="w-[1rem] h-[1rem] accent-[green]"
                              type="checkbox"
                              name={value?.accessorKey}
                              id={value?.accessorKey}
                              checked={
                                !hiddenColumns.includes(value?.accessorKey)
                              }
                              onChange={(e: any) => {
                                if (!hiddenColumns.includes(e.target.name)) {
                                  setHiddenColumns([
                                    ...hiddenColumns,
                                    e.target.name,
                                  ]);
                                } else {
                                  setHiddenColumns(
                                    hiddenColumns?.filter(
                                      (item: any) =>
                                        item !== e.target.name && item
                                    )
                                  );
                                }
                              }}
                            />
                            <label
                              htmlFor={value?.accessorKey}
                              className="font-semibold"
                            >
                              {value?.header}
                            </label>
                          </div>
                        )}
                      </Draggable>
                    </>
                  );
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="flex items-center gap-2 justify-end pr-6 pt-2">
        <button
          className="font-semibold w-[5.5rem] h-[2.3rem] bg-[#D4D4D4] text-black rounded-md hover:bg-slate-400 ease-in duration-300"
          onClick={clientColumnReset}
        >
          Reset
        </button>
        <button
          className="font-semibold w-[5.5rem] h-[2.3rem] bg-[#D4D4D4] text-black rounded-md hover:bg-slate-400 ease-in duration-300"
          onClick={() => setDragAndDropModal(false)}
        >
          Cancel
        </button>
        <button
          className="font-semibold w-[5.5rem] h-[2.3rem] bg-[#00B282] text-white rounded-md hover:opacity-80 ease-in duration-300"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </Modal>
  );
};

export default DragAndDropPopup;
