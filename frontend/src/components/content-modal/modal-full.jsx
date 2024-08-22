import {
    Dialog,
    DialogBody,
  } from "@material-tailwind/react";
import PropTypes from 'prop-types';

const ModalFull = ({children, isOpen}) => {
    return(
        <Dialog size="xl" open={isOpen}>
            <DialogBody divider className="grid place-items-center gap-4">
                {children}
            </DialogBody>
        </Dialog>
    );
}

ModalFull.propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool,
}

export default ModalFull;