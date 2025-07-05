import Http from "./http";

export const addContactNote = async (data: any) => {
  return await Http.post("contact-note/add-contact-note", data, true);
};

export const getNotesAPI = async (id: any) => {
  return await Http.get(`contact-note/get-contact-notes/${id}`, true);
};

export const deleteNote = async (id: any) => {
  return await Http.delete(`contact-note/delete-contact-note/${id}`, true);
};

export const updateNote = async (body: any) => {
  return await Http.put(`contact-note/update-contact-note`, body, true);
};

export const nextfollowNotification = async (data:any) => {
  return await Http.post(`contact-note/get-next-follow-update-notification`,data, false);
};

export const readNoteAPI = async (body:any) =>{
  return await Http.put(`contact-note/contact-note-read`,body, true)
}

export const reportingManagerDataApi = async (id:any) =>{
  return await Http.get(`contact/get-reporting-manager/${id}`,true)
}