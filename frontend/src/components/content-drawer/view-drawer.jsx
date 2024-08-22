import { useState } from 'react';
import {  Drawer } from 'antd';
import PropTypes from 'prop-types';
import { resetCont } from '../../actions/contractAction';
import { useDispatch } from 'react-redux';

const DrawerComponent = ({ children, btnTitle }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();
    const showLargeDrawer = () => {
      setSize('large');
      setOpen(true);
    };
    const onClose = async () => {
      await dispatch(resetCont());
      setOpen(false);
    };
    return(
        <div>
            <ButtonDrawer onclick={showLargeDrawer} label={btnTitle} />
            <Drawer
                title={`Contract Detail`}
                placement="right"
                size={size}
                onClose={onClose}
                open={open}
                className='rounded-l-xl'
            >
                {children}
            </Drawer>
        </div>
    );
};

export const ButtonDrawer = ({ label , onclick }) => {
    return (
        <button onClick={onclick} className='w-full'>
            <div className='px-2 py-2 border-2 rounded-md w-full'>
                <span>{label}</span>
            </div>
        </button>
    );
};

DrawerComponent.propTypes = {
    children: PropTypes.any,
    btnTitle: PropTypes.string,
};

ButtonDrawer.propTypes = {
    children: PropTypes.any,
    onclick: PropTypes.func,
    label: PropTypes.string,
};

export default DrawerComponent;