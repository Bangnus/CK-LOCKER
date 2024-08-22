import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IoClose } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";

  export const Modal = ({children, title, btnName, defaultBtn, closeModal, headerIcon }) => {

    const [size, setSize] = useState(null);
 
    const handleOpen = (value) => setSize(value); 


    useEffect(() => {
        if (closeModal === true) handleOpen(null);
    }, [closeModal]);
  

    return (
        <div>
            <div className="flex gap-3">
                { btnName === undefined ?
                <button onClick={() => handleOpen("xl")} className="bg-red-400 rounded-full hover:bg-red-500 duration-100 ease-in-out drop-shadow-lg hover:rotate-45">
                    <div className="text-[45px] text-white font-primaryBold">
                        <IoAddOutline />
                    </div>
                </button>
                :
                <Button onClick={() => handleOpen("xl")} color="red" variant="gradient">
                    {btnName} 
                </Button>
                }
            </div>
            <Dialog open={ size === "xl"} size={size || "md"} handler={handleOpen} >
                <div className="flex w-full justify-between items-center font-primaryMedium animate-fade-down animate-once animate-duration-1000 animate-delay-[50ms] animate-ease-in-out">
                    <DialogHeader>
                        <div className="flex gap-x-3 items-center">
                            {
                                headerIcon !== undefined ?
                                <img src={headerIcon} className="w-[65px]" alt="" />
                                : null
                            }
                            <span>{title}</span>
                        </div>
                    </DialogHeader>
                    <button onClick={() => handleOpen(null)} className="mr-4 bg-gray-100 h-[30px] w-[30px] flex justify-center items-center rounded-full hover:bg-gray-400 hover:text-black duration-150 ease-in-out">
                        <IoClose />
                    </button>
                </div>
                <DialogBody>
                    {children}
                </DialogBody>
                <DialogFooter className={`${defaultBtn ? '' : 'hidden'}`}>
                <Button
                    variant="text"
                    color="red"
                    onClick={() => handleOpen(null)}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    variant="gradient"
                    color="green"
                    onClick={() => handleOpen(null)}
                >
                    <span>Confirm</span>
                </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
  }

Modal.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    btnName: PropTypes.string,
    defaultBtn: PropTypes.bool,
    closeModal: PropTypes.bool,
    onClick: PropTypes.func,
    headerIcon: PropTypes.any,
}