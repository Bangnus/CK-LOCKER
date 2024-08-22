import axios from "axios";
import { baseUrl } from "../config/baseurl";
import Cookies from "js-cookie";

export const ContActionType = {
    FECTH_CONT: "FETCH_CONT",
    RESET_CONT: "RESET_CONT",
};

export const fecthCont = (data) => async (dispatch) => {
    try {
        const authToken = Cookies.get("authToken");        

        const response = await axios.get(`${baseUrl}/contracts/${data.contNo}`, {
            headers: { Authorization: `Bearer ${authToken}` },
        });

        dispatch({
            type: ContActionType.FECTH_CONT,
            payload: response.data.body,
        });

        return { status: true, message: response.data };
    } catch (error) {
        return { status: false, message: error };
    }
};  

export const resetCont = () => async (dispatch) => {
    try {
        dispatch({
            type: ContActionType.RESET_CONT,
            payload: null,
        });

        return { status: true, message: "Contract reset successfully" };
    } catch (error) {
        return { status: false, message: error };
    }
}



