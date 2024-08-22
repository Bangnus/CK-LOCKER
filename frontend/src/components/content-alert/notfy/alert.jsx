import PropTypes from 'prop-types';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const Snackbar = ({message}) =>  {
    const snackBar = new Notyf({
        duration: 2000,
        position: {
          x: 'right',
          y: 'top',
        },
    });
    snackBar.success(`${message}`);
}

Snackbar.propTypes = {
    message: PropTypes.string.isRequired,
}

export default Snackbar;