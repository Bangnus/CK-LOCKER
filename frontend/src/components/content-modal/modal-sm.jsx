import {
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import PropTypes from 'prop-types';

const ModalSm = ({children, isOpen}) => {
    return(
        <Dialog open={isOpen}>
            <DialogBody divider className="grid place-items-center gap-4">
                {children}
            </DialogBody>
        </Dialog>
    );
}

ModalSm.propTypes = {
    children: PropTypes.node,
    isOpen: PropTypes.bool,
}

export default ModalSm;