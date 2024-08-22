import PropTypes from 'prop-types';

const ButtonRFull = ({icon}) => {
    return (
        <button className="bg-red-400 rounded-full hover:bg-red-500 duration-100 ease-in-out drop-shadow-lg hover:rotate-45">
            <div className="text-[45px] text-white font-primaryBold">
                {icon}
            </div>
        </button>
    );
}

ButtonRFull.propTypes = {
    icon: PropTypes.node.isRequired
}

export default ButtonRFull;