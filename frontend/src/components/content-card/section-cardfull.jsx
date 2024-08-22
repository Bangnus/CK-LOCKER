import PropTypes from 'prop-types';

const FullCard = ({children}) => {
    return(
        <div className='bg-white px-2 py-2 mb-[30px] rounded-lg animate-fade-up animate-once animate-duration-500 animate-ease-in-out'>
            {children}
        </div>
    );
}

FullCard.propTypes = {
    children: PropTypes.node.isRequired,
}

export default FullCard;