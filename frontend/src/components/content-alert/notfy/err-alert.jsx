import PropTypes from 'prop-types';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const ErrorSnackbar = ({message}) =>  {
    const snackBar = new Notyf({
        duration: 2000,
        position: {
          x: 'right',
          y: 'top',
        },
    });
    snackBar.error(`${message}`);
}

ErrorSnackbar.propTypes = {
    message: PropTypes.string.isRequired,
}

export default ErrorSnackbar;