import { useSelector } from "react-redux";

export type Client = {
  id: string;
  clientName: string;
  firstName: string;
  lastName: string;
  title: string;
  reportingManager: string;
  category: string;
  industry: string;
  city: string;
  state: string;
  country: string;
  contactNote: string;
  ownership: string;
  createdBy: string;
  updatedAt: string;
  createdAt: string;
  nextFollowUpDateTime: string;
  lastFollowUpDate: string;
  contactTimeZone: string;
  phone1: string;
  phone2: string;
  phone3: string;
  email: string;
  alternateEmail: string;
  unit: string;
  endClient: string;
  skillsSupported: string;
  standardComment: string;
  leadStatus: string;
  leadSource: string;
  linkedInProfile: string;
  select: Element;
};

export const columns = () => {
  const { selectedIds } = useSelector((state: any) => state.contact);

  return [
    {
      id: "select",
      header: ({ table }: any) => (
        <input
          type="checkbox"
          style={{ width: "18px", height: "18px", cursor: "pointer" }}
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }: any) => {
        const { id } = row?.original;
        return (
          <input
            type="checkbox"
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
            {...{
              // checked: row.getIsSelected(),
              checked: selectedIds?.includes(id) ? true : false,
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        );
      },
      isFilter: false,
      isSort: true,
    },
    {
      accessorKey: "id",
      header: "ID",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "clientName",
      header: "Client Name",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "contactNote",
      header: "Notes",
      isFilter: false,
      isSort: false,
    },
    {
      accessorKey: "fullName",
      header: "Full Name",
      isFilter: true,
      isSort: true,
    },

    {
      accessorKey: "firstName",
      header: "First Name",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "title",
      header: "Title",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "city",
      header: "City",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "state",
      header: "State",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "country",
      header: "Country",
      isFilter: true,
      isSort: true,
    },

    {
      accessorKey: "reportingManager",
      header: "Reporting Manager",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "nextFollowUpDateTime",
      header: "Next Follow-up date",
      isFilter: true,
      isSort: false,
    },
    {
      accessorKey: "lastFollowUpDate",
      header: "Last Follow-up date",
      isFilter: true,
      isSort: false,
    },
    {
      accessorKey: "contactTimeZone",
      header: "Contact TZ",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "phone1",
      header: "Phone 1",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "phone2",
      header: "Phone 2",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "phone3",
      header: "Phone 3",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "email",
      header: "Email",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "alternateEmail",
      header: "Alternate Email",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "unit",
      header: "Unit",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "endClient",
      header: "End Client",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "skillsSupported",
      header: "Skills Supported",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "standardComment",
      header: "Standard Comments",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "leadStatus",
      header: "Lead Status",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "leadSource",
      header: "Lead Source",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "linkedInProfile",
      header: "LinkedIn Profile",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "ownership",
      header: "Ownership",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "updatedBy",
      header: "Updated By",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      isFilter: true,
      isSort: true,
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      isFilter: true,
      isSort: true,
    },
  ];
};
