import api from "../pathConfiguration";
import {  RequestLogin } from "./types";

export async function fetchLogin(request: RequestLogin) {
    const response = await api.post('/Auth/login', request);
    return response.data;
  }

