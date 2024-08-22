import PropTypes from "prop-types";
import { toast } from 'react-toastify';

const Toastify = ({message}) => {
    toast.success(`${message}`, {
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

Toastify.propTypes = {
    message: PropTypes.string.isRequired,
}

export default Toastify;