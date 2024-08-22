import { IconButton } from "@material-tailwind/react";
import PropTypes from 'prop-types';

const ButtonIcon = ({icon, color, CusStyle, disable, event}) => {
    return (
        <IconButton color={color} className={CusStyle} disabled={disable} onClick={event}>
            {icon}
        </IconButton>
    );
}

ButtonIcon.propTypes = {
    icon: PropTypes.any,
    color: PropTypes.string,
    CusStyle: PropTypes.string,
    disable: PropTypes.bool,
    event: PropTypes.func,
};

export default ButtonIcon;