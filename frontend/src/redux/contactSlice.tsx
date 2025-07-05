import { createSlice } from "@reduxjs/toolkit";

interface contactState {
  contactData: object;
  contactTableData: [];
  contactTablePagination: [];
  selectedIds: any;
  contactTableNoteData: [];
  contactNotificationData: [];
  noteRefresh: any;
}

const isOwner: any = localStorage.getItem("isOwnerData");

const initialState: contactState = {
  contactData: {
    searchBy: "",
    searchField: "",
    sortType: "DESC",
    sortColumn: "createdAt",
    id: [],
    fullName:[],
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
    nextFollowUpDateTime: {
      startDate: "",
      endDate: "",
    },
    lastFollowUpDate: {
      startDate: "",
      endDate: "",
    },
    isExport:false,
    page: 1,
    perPage: 10,
    isAllData: JSON.parse(isOwner) || false,
    isRefresh: false,
  },
  contactTableNoteData: [],
  contactTableData: [],
  contactTablePagination: [],
  contactNotificationData: [],
  selectedIds: [],
  noteRefresh: false,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContactData: (state: any, action: any) => {
      state.contactData = action.payload;
    },
    setContactRefresh: (state: any) => {
      state.contactData.isRefresh = !state.contactData.isRefresh;
    },
    setContactTableData: (state: any, action: any) => {
      state.contactTableData = action.payload;
    },
    setContactTablePagination: (state: any, action: any) => {
      state.contactTablePagination = action.payload;
    },
    setContactTableNoteData: (state: any, action) => {

      state.contactTableNoteData = action.payload;
    },
    setContactNoteRefresh: (state: any) => {
      state.noteRefresh = !state.noteRefresh;
    },
    setSelectedId: (state: any, action: any) => {
      state.selectedIds = action.payload;
    },
    setOwnerData: (_state: any, action: any) => {
      localStorage.setItem("isOwnerData", action.payload);
    },
    setContactNotificationData: (state: any, action: any) => {
      state.contactNotificationData = action.payload;
    },
  },
});

export const {
  setContactData,
  setContactNoteRefresh,
  setContactTableData,
  setContactTablePagination,
  setSelectedId,
  setContactTableNoteData,
  setOwnerData,
  setContactNotificationData,
  setContactRefresh
} = contactSlice.actions;

export default contactSlice.reducer;
