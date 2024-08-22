import axios from "axios";
import { baseUrl } from "../config/baseurl";
import Cookies from "js-cookie";
import { uploadProgress } from "./progressAction";

export const LockerActionType = {
    CREATE_LOCKER: "CREATE_LOCKER",
    FECTH_LOCKERS: "FETCH_LOCKERS",
    FECTH_TYPEDOCS: "FETCH_TYPEDOCS",
    CREATE_TYPEDOC: "CREATE_TYPEDOC",
    BOOKMARK: "BOOKMARK",
    FECTH_FLOORS: "FETCH_FLOORS",
    FECTH_FLOORCONTRACT: "FETCH_FLOORCONTRACT",
}

export const createLocker = (data) => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");

        const response = await axios.post(`${baseUrl}/createLocker`, 
        {
            lockerName: data.LockerName,
            floorQutity: Number(data.floorQutity),
            limitdoc: Number(data.limitdoc),
            LockerZone: data.userZone,
            // color: Number(data.colors),
            colorCode: data.colors,
            proType: data.proType,
        },
        {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: LockerActionType.CREATE_LOCKER,
            payload: response.data,
        });

        return { status: true, message: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
};

export const fecthLockers = () => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");

        const response = await axios.get(`${baseUrl}/fecthLockers`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: LockerActionType.FECTH_LOCKERS,
            payload: response.data,
        });

        return { status: true, message: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
};

export const fecthAllTypedoc = () => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");

        const response = await axios.get(`${baseUrl}/typetakedocument`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: LockerActionType.FECTH_TYPEDOCS,
            payload: response.data,
        });

        return { status: true, message: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
};

export const createTypeDoc = (data) => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");

        const response = await axios.post(`${baseUrl}/typetakedocument`, {
            nameTH: data.nameTH,
            nameENG: data.nameENG,
            ZoneActive: data.selectOptions,
        },{
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: LockerActionType.CREATE_TYPEDOC,
            payload: response.data.body,
        });
        
        return { status: true, message: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
};

export const bookMark = (data) => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");
        
        const response = await axios.post(`${baseUrl}/bookmarks`, {
            userId: data.userId,
            lockerId: data.lockerId,
            bookActive: data.bookActive,
        }, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: LockerActionType.BOOKMARK,
            payload: response.data.body,
        });

        return { status: true, message: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
};

export const fecthFloors = (LockerId) => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");

        const response = await axios.get(`${baseUrl}/lockerfloors/${LockerId}`, {
            // responseType: "blob",
            headers: { Authorization: `Bearer ${authToken}` },
            onDownloadProgress: (progressEvent) => {
                const percentComplete = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(`Download progress: ${percentComplete}%`);
                dispatch(uploadProgress(percentComplete));
            },  
        });

        dispatch({
            type: LockerActionType.FECTH_FLOORS,
            payload: response.data.body,
        });

       return { status: true, message: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
};

export const fecthFloorcontract = (data) => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");

        const response = await axios.get(`${baseUrl}/floorcontract/${data.lockerId}/${data.floorsId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: LockerActionType.FECTH_FLOORCONTRACT,
            payload: response.data.body,
        })

        return { status: true, message: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
}
