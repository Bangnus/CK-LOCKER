import Button from '@mui/material/Button';
import Proptypes from 'prop-types';

const Buttons = ({name, style, onEvent}) => {
    return(
        <Button variant="contained" className={`${style}`} onClick={onEvent} disableElevation>{name}</Button>
    );
}

Buttons.propTypes = {
    name: Proptypes.string.isRequired,
    style: Proptypes.string,
    onEvent: Proptypes.func.isRequired,
}

export default Buttons;
