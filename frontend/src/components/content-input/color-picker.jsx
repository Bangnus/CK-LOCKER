import { SketchPicker } from 'react-color';
import { useState } from "react";
import PropTypes from 'prop-types';

const ColorPicker = ({ data }) => {

    const [color, setColor] = useState({
        hex: '#A5D6A7',
    });
    const [displayColor, setDisplayColor] = useState(false);

    const handleChange = (event) => {
        setColor(event);
        console.log(event);
        data(event);
    }

    const handleClick = (e) => {
        e.preventDefault();
        setDisplayColor(!displayColor);
    }

    const popover = {
        position: 'absolute',
        zIndex: '2',
    }

    const cover = {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    }
    return (
        <div className="w-full">
            <div>
                <button style={{background: `${color.hex}`}} onClick={handleClick} className='px-4 py-4 border-2 border-gray-300 rounded-lg hover:border-red-500 duration-100 ease-in-out'></button>
            </div>
            {
                displayColor ?
                <div style={popover}>
                    <div style={ cover } onClick={ handleClick }/>
                     <SketchPicker
                        color={ color }
                        onChangeComplete={ handleChange }
                    />
                </div>
                : null
            }
        </div>
    );
};

ColorPicker.propTypes = {
    data: PropTypes.any,
};

export default ColorPicker;