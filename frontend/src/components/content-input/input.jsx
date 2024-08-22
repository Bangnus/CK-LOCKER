import { Input } from "@material-tailwind/react";
import PropTypes from 'prop-types';

export const InputMd = ({lable, inputStyle, value, OnChange, type, color}) => {
    return (
        <Input size="md" label={lable} className={`${inputStyle}`} color={color} type={`${type === undefined ? 'text' : type}`} value={value} onChange={(e) => OnChange(e.target.value)}/>
    );
}

export const InputLg = ({lable, inputStyle, value, OnChange, type, color}) => {
    return (
        <Input size="lg" label={lable} className={inputStyle} color={color} type={`${type === undefined ? 'text' : type}`} value={value} onChange={(e) => OnChange(e.target.value)} />
    );
}

InputMd.propTypes = {
    lable: PropTypes.string,
    inputStyle: PropTypes.string,
    value: PropTypes.string,
    OnChange: PropTypes.func,
    type: PropTypes.string,
    color: PropTypes.string,
}

InputLg.propTypes = {
    lable: PropTypes.string,
    inputStyle: PropTypes.string,
    value: PropTypes.string,
    OnChange: PropTypes.func,
    type: PropTypes.string,
    color: PropTypes.string,
}