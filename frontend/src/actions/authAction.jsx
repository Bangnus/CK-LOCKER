/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { baseUrl } from "../config/baseurl";
import Cookies from "js-cookie";

export const AuthActionType = {
    USERS_SIGNIN: "USERS_SIGNIN",
    FECTH_USER: "FETCH_USER",
    FECTH_USERS: "FETCH_USERS",
    SIGN_OUT: "SIGN_OUT",
    CREATE_ROLE: "CREATE_ROLE",
    CREATE_USER: "CREATE_USER",
}

export const UserSignin = (data) => async (dispatch) => {
    try {
        const response = await axios.post(`${baseUrl}/authenticate/signin`, {
            username: data.username,
            password: data.password,
        });    

        if (response.status === 200) {
            Cookies.set("authToken", response.data.authToken, { expires: 7 });
        }

        dispatch({
            type: AuthActionType.USERS_SIGNIN,
            payload: response.data,
        });

        return { status: true, message: "User created successfully", data: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
};

export const fecthUser = () => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");

        if (!authToken) {
            throw new Error("No token found");
        }

        const response = await axios.get(`${baseUrl}/fetchUser`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: AuthActionType.FECTH_USER,
            payload: response.data,
        });

        return { status: true, message: "User fetched successfully", data: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
};

export const fecthUsers = () => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");

        const response = await axios.get(`${baseUrl}/fecthUsers`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: AuthActionType.FECTH_USERS,
            payload: response.data,
        });

        return { status: true, message: "Users fetched successfully", data: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
}

export const createUser = (data) => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");

        const response = await axios.post(`${baseUrl}/createUser`, {
            name: data.Name,
            username: data.userName,
            passoword: data.Password,
            email: data.Email,
            userZone: data.Zone,
            userBranch: data.Branch,
            userRole: data.Role,
        },{
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: AuthActionType.CREATE_USER,
            payload: response.data.body,
        });

        return { status: true, message: "User created successfully", data: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
};

export const SignOut = () => async (dispatch) => {
    try {
        dispatch({
            type: AuthActionType.SIGN_OUT,
            payload: null,
        });

        return { status: true, message: "User signed out successfully" };
    } catch (error) {
        return { status: false, message: error };
    }
}