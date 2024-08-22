import axios from "axios";
import { baseUrl } from "../config/baseurl";
import Cookies from "js-cookie";

export const TypedocActionType = {
    FECTH_TYPEDOC: "FECTH_TYPEDOC",
    RECHECK_CONT:  "RECHECK_CONT",
    CONTRACT: "CONTRACT",
    CREATE_TAKEDOC: "CREATE_TAKEDOC",
    FECTH_DOCWAIT: "FECTH_DOCWAIT",
}

export const fecthTypedocument = () => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");

        const response = await axios.get(`${baseUrl}/typetakedocument`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        console.log(response.data);

        dispatch({
            type: TypedocActionType.FECTH_TYPEDOC,
            payload: response.data.body,
        });

        return { status: true, message: response.data.body };
    } catch (error) {
        return { status: false, message: error };
    }
};

export const checkTakeDoc = (data, contNo) => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");

        const response = await axios.post(`${baseUrl}/contracts/${contNo}`, {

        },{
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: TypedocActionType.RECHECK_CONT,
            payload: response.data.body,
        });

        return { status: true, message: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
};

export const reCheckTakeDoc = (data) => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");
        const response = await axios.post(`${baseUrl}/takedocument/${data.contNo}`, {
            NameLoan: data.contType
        },{
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: TypedocActionType.CONTRACT,
            payload: response.data.body,
        });

        return { status: true, message: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
};

export const createTakedoc = (data) => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");
        const response = await axios.post(`${baseUrl}/takedocument`, {
            contNo: data.contNo,
            typeTakedocId: data.typeTakedocId,
            typeLoan: data.typeLoan,
            Note: data.Note,
            Locker: data.Locker,
            Floor: data.Floor
        },{
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: TypedocActionType.CREATE_TAKEDOC,
            payload: response.data.body,
        });

        return { status: true, message: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
};

export const fecthtakeWait = () => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");
        const userId = Cookies.get("userId");
        const response = await axios.get(`${baseUrl}/takedocument/${userId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: TypedocActionType.FECTH_DOCWAIT,
            payload: response.data.body
        });

        return { status: true, message: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
};