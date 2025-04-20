import {apiAuthRequest, apiRequest} from "@/lib/api-config";
import {getAuthToken} from "@/lib/auth-api";

export async function loginService({email, password}) {
    const res = await apiAuthRequest("/auths/login", "POST", {
        email,
        password,
    })
    return res;
}

export async function getCurrentUser(){
    const token = await getAuthToken();
    const res = await apiRequest("/user", "GET", null, token);
    return res;
}
