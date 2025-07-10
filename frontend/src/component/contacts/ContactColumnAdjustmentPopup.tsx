import { Modal } from "antd";
import { useEffect, useState } from "react";
import { RxCross2, RxDragHandleDots2 } from "react-icons/rx";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ColumnLogo from "../../assets/ColumnLogo";

const defaultColumns: any = [
    { accessorKey: "select", header: "Select" },
    { accessorKey: "id", header: "ID" },
    {
        accessorKey: "clientName",
        header: "Client Name",
    },
    {
        accessorKey: "contactNote",
        header: "Notes",
    },
    {
        accessorKey: "fullName",
        header: "Full Name",
    },
    {
        accessorKey: "firstName",
        header: "First Name",
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "city",
        header: "City",
    },
    {
        accessorKey: "state",
        header: "State",
    },
    {
        accessorKey: "country",
        header: "Country",
    },
    {
        accessorKey: "reportingManager",
        header: "Reporting Manager",
    },
    {
        accessorKey: "nextfollowUpdate",
        header: "Next Follow-up date",
    },
    {
        accessorKey: "lastfollowUpdate",
        header: "Last Follow-up date",
    },
    {
        accessorKey: "contactTimeZone",
        header: "Contact Time Zone",
    },
    {
        accessorKey: "phone1",
        header: "Phone 1",
    },
    {
        accessorKey: "phone2",
        header: "Phone 2",
    },
    {
        accessorKey: "phone3",
        header: "Phone 3",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "alternateEmail",
        header: "Alternate Email",
    },
    {
        accessorKey: "unit",
        header: "Unit",
    },
    {
        accessorKey: "endClient",
        header: "End Client",
    },
    {
        accessorKey: "skillsSupported",
        header: "Skills Supported",
    },
    {
        accessorKey: "standardComment",
        header: "Standard Comments",
    },
    {
        accessorKey: "leadStatus",
        header: "Lead Status",
    },
    {
        accessorKey: "leadSource",
        header: "Lead Source",
    },
    {
        accessorKey: "linkedInProfile",
        header: "LinkedIn Profile",
    },
    {
        accessorKey: "ownership",
        header: "Ownership",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
    {
        accessorKey: "updatedAt",
        header: "Updated At",
    },
    {
        accessorKey: "createdBy",
        header: "Created By",
    },

]

const ContactColumnAdjustmentPopup = ({ isColumnPopupModel, setIsColumnPopupModel, setColumnOrder, setColumnVisibility }: any) => {
    const [selectedColumns, setSelectedColumns]: any = useState(defaultColumns);

    const [finalColumns, setFinalColumns]: any = useState([]);
    const [hiddenColumns, setHiddenColumns]: any = useState([]);

    const handleColumnChange = (result: any) => {

        if (!result.destination) {
            return;
        }
        const list: any = Array.from(selectedColumns);
        const [removed]: any = list.splice(result.source.index, 1);
        list.splice(result.destination.index, 0, removed);
        setSelectedColumns(list);
        setFinalColumns(list.map((e: any) => e?.accessorKey));
    }

    const handleApply = () => {
        let hideCol: any = {};
        hiddenColumns.map((item: any) => {
            hideCol = { ...hideCol, [item]: false }
            return hideCol
        })
        setColumnOrder(finalColumns)
        setColumnVisibility(hideCol)
        localStorage.setItem("contactColumnOrder", JSON.stringify(finalColumns))
        localStorage.setItem("contactColumnVisibillity", JSON.stringify(hideCol))
        setIsColumnPopupModel(false);
    }

    const clientColumnReset = () => {
        localStorage.setItem("contactColumnOrder", JSON.stringify([]))
        localStorage.setItem("contactColumnVisibillity", JSON.stringify({}))
        setColumnOrder([])
        setColumnVisibility({})
        setIsColumnPopupModel(false);
        setHiddenColumns([])
        setSelectedColumns(defaultColumns);
    }

    const contactColumnOrder: any = localStorage.getItem("contactColumnOrder");
    const contactColumnOrderData: any = contactColumnOrder && JSON.parse(contactColumnOrder || []);
    const contactColumnVisibillity: any = localStorage.getItem("contactColumnVisibillity");
    const contactColumnVisibillityData: any = contactColumnVisibillity && JSON.parse(contactColumnVisibillity || {});

    useEffect(() => {
        if (!isColumnPopupModel) return;
        if (contactColumnOrder && contactColumnOrderData?.length > 0) {
            const newArr: any = contactColumnOrderData?.map((item: any) => {
                return selectedColumns.find((obj: any) => obj?.accessorKey === item)
            })
            setSelectedColumns(newArr);
        } else {
            setSelectedColumns(defaultColumns);
        }

    }, [isColumnPopupModel])


    useEffect(() => {
        if (!isColumnPopupModel) return;
        if (
            contactColumnVisibillity &&
            Object?.keys(contactColumnVisibillityData)?.length > 0
        ) {
            setHiddenColumns(Object?.keys(contactColumnVisibillityData));
        } else {
            setHiddenColumns([]);
        }
    }, [isColumnPopupModel]);

    return (
        <>
            <Modal
                footer={null}
                className="drag-and-drop-client-modal"
                open={isColumnPopupModel}
                onOk={() => setIsColumnPopupModel(false)}
                onCancel={() => setIsColumnPopupModel(false)}
            >
                <div className="h-[3.5rem] flex items-center justify-between pt-2 pl-8 pr-2 ">
                    <div className="flex items-center gap-4">
                        <ColumnLogo className={"text-[30px]"} />

                        <h1 className="text-[16px] text-[#292828] font-semibold">Column Settings</h1>
                    </div>
                    <div onClick={() => setIsColumnPopupModel(false)}>
                        <RxCross2 className="text-xl cursor-pointer text-[grey]" />
                    </div>
                </div>
                <div className="h-[28rem] overflow-x-hidden overflow-scroll border-t border-b border-[#bbbbbb] ">
                    <>
                        <DragDropContext onDragEnd={handleColumnChange}>
                            <Droppable droppableId="1">
                                {(provided: any) => (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        {selectedColumns?.map((value: any, index: any) => {
                                            if (value?.accessorKey === "id" ||
                                                value?.accessorKey === "select" ||
                                                !value?.accessorKey) {
                                                return;
                                            }
                                            return (
                                                <>
                                                    <Draggable draggableId={value.accessorKey}
                                                        key={value.accessorKey}
                                                        index={index}>
                                                        {
                                                            (provided: any) => (
                                                                <div ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    key={index}
                                                                    className="flex items-center w-[15rem] h-[3rem] gap-2 pl-10">
                                                                    <RxDragHandleDots2 className="text-xl" />
                                                                    <input className="w-[1rem] h-[1rem] accent-[green]"
                                                                        type="checkbox"
                                                                        name={value?.accessorKey}
                                                                        id={value?.accessorKey}
                                                                        checked={!hiddenColumns.includes(value?.accessorKey)}
                                                                        onChange={(e: any) => {
                                                                            if (!hiddenColumns.includes(e.target.name)) {
                                                                                setHiddenColumns([...hiddenColumns, e.target.name]);
                                                                            } else {
                                                                                setHiddenColumns(hiddenColumns?.filter((ele: any) => {
                                                                                    ele !== e.target.name && ele
                                                                                }));
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
                                                            )
                                                        }
                                                    </Draggable>
                                                </>
                                            )
                                        })}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </>
                </div>
                <div className="flex items-center gap-2 justify-end pr-6 pt-2">
                    <button className="w-[5.5rem] h-[2.3rem] bg-[#D4D4D4] text-black rounded-md font-semibold" onClick={clientColumnReset}>
                        Reset
                    </button>
                    <button className="w-[5.5rem] h-[2.3rem] bg-[#D4D4D4] text-black rounded-md font-semibold"
                        onClick={() => setIsColumnPopupModel(false)}
                    >
                        Cancel
                    </button>
                    <button className="w-[5.5rem] h-[2.3rem] bg-[#F57C00] text-white rounded-md font-semibold" onClick={handleApply}>
                        Apply
                    </button>
                </div>
            </Modal>
        </>
    );
}


export default ContactColumnAdjustmentPopup;