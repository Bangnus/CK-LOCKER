import { Select, Option } from "@material-tailwind/react";
import PropTypes from 'prop-types';

const InputSelector = ({option, lable, color , values, OnChanges}) => {    
    return(
        <Select 
        color={color} 
        size="md" 
        label={lable} 
        value={values} 
        onChange={(e) => OnChanges(e.target.value)}
        >
            {
                option === undefined ? 
                <Option>-- Select Option --</Option>
                :
                option.map((item, key) => (
                    <Option value={item.optionValue} key={key}>{item.name}</Option>
                ))
            }
        </Select>
    );
}

InputSelector.propTypes = {
    option: PropTypes.array,
    lable: PropTypes.string,
    color: PropTypes.string,
    values: PropTypes.string,
    OnChanges: PropTypes.func,
}

export default InputSelector;