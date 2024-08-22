import PropTypes from "prop-types";
import { toast } from 'react-toastify';

const ToastifyWarning = ({message}) => {
    toast.warn(`${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};

ToastifyWarning.propTypes = {
    message: PropTypes.string.isRequired,
}

export default ToastifyWarning;