import Http from "./http";

export const getClientData = async (data: any) => {
  return await Http.post("client/all-in-one-client-search", data, false);
};

// export const updateClient = async (data: any) => {
//   return await Http.formPut("client/update-client", data, true);
// };

export const updateClient = async (data: any) => {
  return await Http.put("client/update-client", data, true);
};
export const addNewClient = async (data: any) => {
  return await Http.formPost("client/add-client", data, true);
};

export const getCountryData = async () => {
  return await Http.get("location/get-countries", false);
};
export const getStateData = async (data: any) => {
  return await Http.post("location/get-states", data, false);
};

export const getCitiesData = async (data: any) => {
  return await Http.post("location/get-cities", data, false);
};

export const getOwnersList = async () => {
  return await Http.get("user/get-user-list", false);
};

export const deletClientApi = async (id: any) => {
  return await Http.delete(`/client/delete-client/${id}`, true);
};

export const addClientNoteApi = async (data: any) => {
  return await Http.post(`client-note/add-client-note`, data, true);
};

export const getClientNotesApi = async (id: any) => {
  return await Http.get(`client-note/get-client-notes/${id}`, false);
};

export const updateNewClientNote = async (body: any) => {
  return await Http.put(`client-note/update-client-note`, body, true);
};

export const deleteClientNotesApi = async (id: any) => {
  return await Http.delete(`client-note/delete-client-note/${id}`, true);
};

export const submitImport = async (data: any) => {
  return await Http.post("client/import-client", data, true);
};
