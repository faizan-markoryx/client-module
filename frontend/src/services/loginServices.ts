import Http from "./http"

export const userLogin = async(data:any) =>{
    return await Http.post("user/login", data, true)
}