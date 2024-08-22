import TextField from '@mui/material/TextField';
import Proptypes from 'prop-types';

const Input = ({ styles, title, value, type, onChange, id }) => {
    return(
        <div className='my-5'>
            <TextField
            label={title}
            id={`${id} outlined-size-small`}
            size="small"
            value={value}
            type={type === null ? 'text' : type}
            onChange={e => onChange(e.target.value)}
            className={`focus:border-blue-500 ${styles}`}
            />
        </div>
    );
};

Input.propTypes = {
    id: Proptypes.number,
    styles: Proptypes.string,
    title: Proptypes.string,
    value: Proptypes.string,
    type: Proptypes.string,
    onChange: Proptypes.func.isRequired,
}

export default Input;