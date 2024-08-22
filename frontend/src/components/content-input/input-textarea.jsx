import { Textarea } from "@material-tailwind/react";
import PropTypes from "prop-types";

const InputTextarea = ({ label, color, value, OnChange }) => {
    return (
        <Textarea size="nd" label={label} color={color} value={value} onChange={(e) => OnChange(e.target.value)} className="w-full" />
    );
};

InputTextarea.propTypes = {
    label: PropTypes.string,
    color: PropTypes.string,
    value: PropTypes.string,
    OnChange: PropTypes.func,
};

export default InputTextarea;