import Http from "./http";

export const contactMultiSearch = async (data: any) => {
  return await Http.post("contact/all-in-one-contact-search", data, false);
};

export const contactBulkChangeOwner = async (data: any) => {
  return await Http.put("contact/contact-bulk-ownership-update", data, true);
};

export const contactBulkDelete = async (data: any) => {
  return await Http.put("contact/contact-bulk-ownership-delete", data, true);
};

