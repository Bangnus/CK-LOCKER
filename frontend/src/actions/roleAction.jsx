/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { baseUrl } from "../config/baseurl";
import Cookies from "js-cookie";

export const RoleActionType = {
    CREATE_ROLE: "CREATE_ROLE",
    FECTH_ROLES: "FECTH_ROLES",
    DELETE_ROLE: "DELETE_ROLE",
};

export const createRole = (data) => async (dispatch) => {
    try {
        const authToken = Cookies.get('authToken');

        const response = await axios.post(`${baseUrl}/createRole`, {
            name_th : data.nameTH,
            name_eng: data.nameENG,
        },{
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: RoleActionType.CREATE_ROLE,
            payload: response.data,
        });

        return { status: true, message: response.data }
    } catch (error) {
        return { status: false, message: error };
    }
};

export const fecthAllRole = () => async (dispatch) => {
    try {
        const authToken = Cookies.get('authToken');
        const response = await axios.get(`${baseUrl}/fecthRoles`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: RoleActionType.FECTH_ROLES,
            payload: response.data,
        })

        return { status: true, message: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
}

export const deleteRole = (id) => async (dispatch) => {
   try {
        const authToken = Cookies.get('authToken');

        const response = await axios.delete(`${baseUrl}/deleteRole/${id}`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: RoleActionType.DELETE_ROLE,
            payload: response.data,
        });

        return { status: true, message: response.data };
   } catch (error) {
        return { status: false, message: error };
   }
}