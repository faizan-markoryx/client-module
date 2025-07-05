import Http from "./http"


export const createNewUser = async (data:any) =>{
    return await Http.post("user/add-user", data, true)
}