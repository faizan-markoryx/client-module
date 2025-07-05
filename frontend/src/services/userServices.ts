import Http from "./http"

export const userTableData = async (data:any) =>{
    return await Http.post("user/search", data, true)
}

export const editUserAPI = async (data:any) => {
    return await Http.put("user/update-user", data, true)
}

export const userSwitchAPI = async (data:any) =>{
    return await Http.post("user/change-activation-status", data, true)
}

export const userList= async () =>{
    return await Http.get("user/get-user-list", false)
}

