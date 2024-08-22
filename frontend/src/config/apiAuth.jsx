/* eslint-disable react-refresh/only-export-components */
import Cookies from 'js-cookie';

const authToken = Cookies.get('authToken');
const setAuthorizedHeader = `Bearer ${authToken}`;

export const haedersAuth = {
    headers: {
        Authorization: setAuthorizedHeader,
    },
};

export const CookiesToken = setAuthorizedHeader;