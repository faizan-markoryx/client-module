import { createSlice } from "@reduxjs/toolkit";

interface ClientState {
  clientData: object;
  clientDataformat: object;
  clientRefresh: boolean;
  clientSelectedIDs:any;
  clientNoteRefresh:boolean;
  clientAddNoteId:string
  
}

const isAllClientData: any = localStorage.getItem("isClinetAllData");
const isAllDataShow: boolean = JSON.parse(isAllClientData || false);

const initialState: ClientState = {
  clientData: {},
  clientDataformat: {
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
  },
  clientRefresh: false,
  clientSelectedIDs:[],
  clientNoteRefresh:false,
  clientAddNoteId:""

};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClientData: (state, action) => {
      state.clientData = action.payload;
    },
    setClientPagination: (state, action) => {
      state.clientDataformat = {
        ...state?.clientDataformat,
        ...action?.payload,
      };
    },
    setClientRefresh: (state) => {
      state.clientRefresh = !state?.clientRefresh;
    },
    setClientOwnerData: (state: any,action:any) => {
      state.clientDataformat = action?.payload;
    },
    setClientStateData: (state: any, action: any) => {
      state.clientDataformat = action?.payload;
    },
    setClientSelectedId: (state: any, action: any) => {
      state.clientSelectedIDs = action?.payload;
    },
    setClientNoteRefresh:(state:any)=>{
      state.clientNoteRefresh = !state.clientNoteRefresh
    },
    setClientAddNoteId:(state:any,action:any)=>{
        state.clientAddNoteId = action.payload
    }
  },
});

export const {
  setClientData,
  setClientPagination,
  setClientRefresh,
  setClientOwnerData,
  setClientStateData,
  setClientSelectedId,
  setClientNoteRefresh,
  setClientAddNoteId
} = clientSlice.actions as any;

export default clientSlice.reducer;
