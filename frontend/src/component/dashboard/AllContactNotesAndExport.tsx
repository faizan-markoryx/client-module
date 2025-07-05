import exportFromJSON from "export-from-json";
import Http from "../../services/http";
import "../../styles/dashboard/allContactNotesAndExport.css";
import moment from "moment";
import { Button } from "antd";

const AllContactNotesAndExport = ({
  noteBody,
  setIsExportLoader,
  isExportLoader,
}: any) => {
  const noteColumns = [
    {
      accessor: "id",
      header: "Note Id",
    },
    {
      accessor: "id",
      header: "Note Id",
    },
    {
      accessor: "contactId",
      header: "Contact Id",
    },
    {
      accessor: "note",
      header: "Note",
    },
    {
      accessor: "contactNoteLabels",
      header: "Note Lables",
    },
    {
      accessor: "nextFollowUpDateTime",
      header: "Next FollowUp Date",
    },
    {
      accessor: "timezone",
      header: "Timezone",
    },
    {
      accessor: "createdBy",
      header: "Created By",
    },
    {
      accessor: "updatedBy",
      header: "Updated By",
    },
    {
      accessor: "createdAt",
      header: "Created At",
    },
    {
      accessor: "updatedAt",
      header: "Updated At",
    },
    {
      accessor: "ownership",
      header: "Ownership",
    },
    {
      accessor: "standardComment",
      header: "Standard Comment",
    },
    {
      accessor: "read",
      header: "Read",
    },
    {
      accessor: "phone1",
      header: "Phone",
    },
    {
      accessor: "noteSource",
      header: "Note Source",
    },
    {
      accessor: "lastFollowUpDateTime",
      header: "Last FollowUp Date",
    },
    {
      accessor: "isDeleted",
      header: "Delete",
    },
    {
      accessor: "email",
      header: "Email",
    },
    {
      accessor: "country",
      header: "Country",
    },
    {
      accessor: "contactName",
      header: "Contact Name",
    },
  ];

  const handleDashboardExport = () => {
    setIsExportLoader(true);
    const body = {
      updatedAt: noteBody.updatedAt,
      createdBy: noteBody.createdBy,
      page: "",
      perPage: "",
      isExport: true,
    };

    Http.post("dashboard/all-contact-note-list", body, true)
      .then((res: any) => {
        const date = new Date();
        // ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}/time_${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}
        const dateName = `AllContactNotesData_${moment(date).format(
          "MMMM Do YYYY, h:mm:ss a"
        )}`;
        const fileName = dateName;
        const exportType = "csv";
        const data = res?.data?.data;

        const FilterData = data?.map((e: any) => {
          const finalLabes: any = e.contactNoteLabels.join(", ");
          const finalCreatedAt: any = moment(e.createdAt).format("LLL");
          const finalUpdatedAt: any = moment(e.updatedAt).format("LLL");
          const lastFollowUpdatedAt: any = moment(e.lastFollowUpDateTime).format("LLL");
          const finalNextFollowUpDateTime: any = e.nextFollowUpDateTime
            ? moment(e.nextFollowUpDateTime).format("LLL")
            : "";
          let Arr: any = {};
          noteColumns.map((column: any) => {
            if (column.accessor == "contactNoteLabels") {
              Arr = { ...Arr, [column.header]: finalLabes };
            } else if (column.accessor == "createdAt") {
              Arr = { ...Arr, [column.header]: finalCreatedAt };
            } else if (column.accessor == "updatedAt") {
              Arr = { ...Arr, [column.header]: finalUpdatedAt };
            } else if (column.accessor == "nextFollowUpDateTime") {
              Arr = {
                ...Arr,
                [column.header]:
                  finalNextFollowUpDateTime != "Invalid date"
                    ? finalNextFollowUpDateTime
                    : "",
              };
            }else if(column.accessor == "noteSource"){
              Arr = { ...Arr, [column.header]: e[column.accessor] == 0 ? "Incoming" : "Outgoing" };
            }
            else if(column.accessor == "lastFollowUpDateTime"){
              Arr = { ...Arr, [column.header]: lastFollowUpdatedAt };
            }
             else {
              Arr = { ...Arr, [column.header]: e[column.accessor] };
            }
          });

          return Arr;
        });

        if (data.length !== 0) {
          exportFromJSON({ data: FilterData, fileName, exportType });
        }
        setIsExportLoader(false);
      })
      .catch(() => {

        setIsExportLoader(false);
      });
  };

  const userRole: any = localStorage.getItem("clientModuleUserData");

  return (
    <div className="allContactNotesAndExport-main-conatiner">
      <div className="blank-section"></div>
      <div className="allContactNotes-section">All Contact Notes</div>
      <div className="export-section">
        {JSON.parse(userRole).role === 0 ? (
          <Button
            className="exportBtn"
            loading={isExportLoader}
            onClick={() => handleDashboardExport()}
          >
            Export
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default AllContactNotesAndExport;
