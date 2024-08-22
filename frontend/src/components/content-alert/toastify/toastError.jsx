import PropTypes from "prop-types";
import { toast } from 'react-toastify';

const ToastifyError = ({message}) => {
    toast.error(`${message}`, {
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

ToastifyError.propTypes = {
    message: PropTypes.string.isRequired,
}

export default ToastifyError;