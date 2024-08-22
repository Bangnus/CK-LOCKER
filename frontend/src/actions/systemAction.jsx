 import axios from "axios"
 import { baseUrl } from "../config/baseurl";
 import Cookies from "js-cookie";

export const SystemActionType = {
    FECTH_BRANCH: "FECTH_BRANCH",
    FECTH_COLORS: "FECTH_COLORS",
    CREATE_COLOR: "CREATE_COLOR",
    FECTH_PROTYPES: "FECTH_PROTOTYPES",
    CREATE_PROTYPE: "CREATE_PROTOTYPE",
    FECTH_FLBRANCHES: "FECTH_FLBRANCHES",
    FECTH_APIKEYS: "FECTH_APIKEYS",
    CREATE_APIKEY: "CREATE_APIKEY",
};

export const fecthBranchs = () => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");

        const response = await axios.get(`${baseUrl}/zone`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: SystemActionType.FECTH_BRANCH,
            payload: response.data,
        });
        
        return { status: true, message: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
};

export const fecthAllColors = () => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");

        const response = await axios.get(`${baseUrl}/colors`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: SystemActionType.FECTH_COLORS,
            payload: response.data.body,
        });

        return { status: true, message: response.data.body };
    } catch (error) {
        return { status: false, message: error };
    }
};

export const createColor = (data) => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");
        
        const response = await axios.post(`${baseUrl}/colors`, {
            nameTH: data.nameTH,
            nameENG: data.nameEN,
        },{
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: SystemActionType.CREATE_COLOR,
            payload: response.data.body,
        });

        return { status: true, message: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
};

export const fecthAllproducts = () => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");

        const response = await axios.get(`${baseUrl}/producttype`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: SystemActionType.FECTH_PROTYPES,
            payload: response.data.body,
        })
    } catch (error) {
        return { status: false, message: error };
    }
};

export const createProducttpye = (data) => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");        

        const response = await axios.post(`${baseUrl}/producttype`, {
            nameTH: data.nameTH,
            nameENG: data.nameEN,
            ZoneActive: data.selectOptions,
        }, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: SystemActionType.CREATE_PROTYPE,
            payload: response.data.body,
        });

        return { status: true, message: response.data };
    } catch (error) {
        return { status: false, message: 'Creating product type faild' }
    }
};

export const fectchBranchActive = (data) => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");

        const response = await axios.get(`${baseUrl}/branch/${data}`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: SystemActionType.FECTH_FLBRANCHES,
            payload: response.data.body,
        });

        return { status: true, message: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
};

export const createApiKey = () => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");
        const userId = Cookies.get("userId");
        const response = await axios.post(`${baseUrl}/apikey/${userId}`, {}, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: SystemActionType.CREATE_APIKEY,
            payload: response.data.body,
        });

        return { status: true, message: response.data };
    } catch (error) {
        return { status: false, message: 'Creating API key faild' }
    }
};

export const fecthApikeys = () => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");
        const userId = Cookies.get("userId");
        const response = await axios.get(`${baseUrl}/apikey/${userId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: SystemActionType.FECTH_APIKEYS,
            payload: response.data.body,
        });

        return { status: true, message: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
};