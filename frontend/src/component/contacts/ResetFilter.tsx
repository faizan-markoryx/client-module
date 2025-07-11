import {useEffect} from "react"
import { useDispatch } from "react-redux";
import { setContactData } from "../../redux/contactSlice";
import { setClientStateData } from "../../redux/clientSlice";

const ResetFilter = ({ isMultifilterOn, setSearchValue }: any) => {
  const dispatch = useDispatch();
  const isOwner: any = localStorage.getItem("isOwnerData");

  const intContactSate: any = {
    id: [],
    firstName: [],
    lastName: [],
    createdBy: [],
    updatedBy: [],
    createdAt: {
      startDate: "",
      endDate: "",
    },
    updatedAt: {
      startDate: "",
      endDate: "",
    },
    nextFollowUpDateTime: {
      startDate: "",
      endDate: "",
    },
    lastFollowUpDate: {
      startDate: "",
      endDate: "",
    },
    fullName:[],
    linkedInProfile:[],
    standardComment:[],
    alternateEmail:[],
    ownership:[],
    title: [],
    phone1: [],
    phone2: [],
    phone3: [],
    unit:[],
    endClient:[],
    skillsSupported:[],
    leadSource:[],
    email: [],
    city:[],
    state: [],
    country:[],
    reportingManager:[],
    contactTimeZone:[],
    relocation: [],
    availability: [],
    searchBy: "",
    searchField: "",
    sortType: "DESC",
    sortColumn: "createdAt",
    isExport: false,
    page: "1",
    perPage: "10",
    isRefresh: false,
    isAllData: JSON.parse(isOwner),
  };

  const Reset = () => {
    if (!isMultifilterOn().includes(true)) {
      return;
    }
    dispatch(setContactData(intContactSate));
    setSearchValue("");
  };


  const isAllClientData: any = localStorage.getItem("isClinetAllData");
  const isAllDataShow: boolean = JSON.parse(isAllClientData || false);
  const clientDataformat: any = {
    searchBy: "",
    searchField: "",
    sortType: "DESC",
    sortColumn: "createdAt",
    id: [],
    clientName: [],
    websiteUrl: [],
    city: [],
    state: [],
    country: [],
    industry: [],
    paymentTerm: [],
    category: [],
    clientStatus: [],
    clientNotesData: "",
    createdAt: {
      startDate: "",
      endDate: "",
    },
    updatedAt: {
      startDate: "",
      endDate: "",
    },
    isAllData: isAllDataShow,
    isExport:false,
    page: 1,
    perPage: 10,
  };

  const clientReset = () => {
    dispatch(setClientStateData(clientDataformat));
  };

  useEffect(() => {
    clientReset();
  }, []);

  return (
    <div

      className={
        isMultifilterOn().includes(true)
          ? "cursor-pointer mt-[2px]"
          : "mt-[2px] cursor-not-allowed"
      }
      onClick={() => Reset()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="33"
        height="33"
        viewBox="0 0 48 48.773"
      >
        <g
          id="Component_15_1"
          data-name="Component 15 – 1"
          transform="translate(0 0)"
        >
          <text
            id="Reset"
            transform="translate(0 43.773)"
            fill={`${isMultifilterOn().includes(true) ? "#265F9D" : "#a4a5a5"}`}
            fontSize="18px"
            fontFamily="Mulish-Bold, Mulish"
            fontWeight="700"
          >
            <tspan x="0" y="0">
              Reset
            </tspan>
          </text>
          <g
            id="Group_1256"
            data-name="Group 1256"
            transform="translate(-1400.379 -131.727)"
          >
            <path
              id="Icon_awesome-filter"
              data-name="Icon awesome-filter"
              d="M13.175,0H.649A.648.648,0,0,0,.191,1.106L5.184,6.1v5.563a.648.648,0,0,0,.276.531l2.16,1.511a.648.648,0,0,0,1.02-.531V6.1l4.993-4.994A.648.648,0,0,0,13.175,0Z"
              transform="translate(1418.642 141.56)"
              fill={`${
                isMultifilterOn().includes(true) ? "#265F9D" : "#a4a5a5"
              }`}
            />
            <g
              id="Group_1255"
              data-name="Group 1255"
              transform="translate(1410.809 131.727)"
            >
              <path
                id="Path_4168"
                data-name="Path 4168"
                d="M177.3,279.936a2.8,2.8,0,0,1-.117-1.163,1.767,1.767,0,0,1,1.549-1.382,1.689,1.689,0,0,1,1.722,1.089c.585,1.687,1.157,3.378,1.69,5.082a1.641,1.641,0,0,1-1.545,2.117c-1.7.031-3.394.021-5.091,0a1.625,1.625,0,0,1-1.561-1.245,1.655,1.655,0,0,1,.741-1.821c.071-.047.169-.063.213-.19a10.2,10.2,0,0,0-2.67-1.183,11.387,11.387,0,1,0,8,12.983,12.514,12.514,0,0,0,.194-2.091,1.667,1.667,0,0,1,3.3-.3,5.942,5.942,0,0,1,.007,1.528,14.622,14.622,0,0,1-4.52,9.494,14.183,14.183,0,0,1-8.468,3.976,14.364,14.364,0,0,1-12.3-4.383,14.2,14.2,0,0,1-4.07-8.7,14.74,14.74,0,0,1,22.6-13.963c.076.047.15.1.228.141A.39.39,0,0,0,177.3,279.936Z"
                transform="translate(-154.284 -277.384)"
                fill={`${
                  isMultifilterOn().includes(true) ? "#265F9D" : "#a4a5a5"
                }`}
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default ResetFilter;
