import { Button } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import PropTypes from 'prop-types';

const ButtonMd = ({title, btnColor, handleClick, isLoading}) => {
    return(
        <Button className={`${btnColor}`} size="md" onClick={handleClick}>
            <div className="flex gap-x-3 items-center">
                <div className={`${isLoading ? '' : 'hidden'}`}>
                    <Spinner color="blue" />
                </div>
                <div>
                    <span>{title}</span>
                </div>
            </div>
        </Button>
    );
}

ButtonMd.propTypes = {
    title: PropTypes.string,
    btnColor: PropTypes.string,
    handleClick: PropTypes.func,
    isLoading: PropTypes.bool,
}

export default ButtonMd;