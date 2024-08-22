import ModalFull from "../../../components/content-modal/modal-full";
import PropTypes from 'prop-types';
import { InputMd } from "../../../components/content-input/input";
import ButtonMd from "../../../components/content-button/button-md";
import editGif from '../../../assets/image/gif/edit.gif';
import { IoClose } from "react-icons/io5";
import { useState, useEffect } from "react";
import editSvg from '../../../assets/image/svg/user-edit.svg';

const RoleEditModal = ({isOpen, RowId}) => {

    const [nameTH, setNameTH] = useState('');
    const [nameENG, setNameENG] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isModal, setModal] = useState(true);

    const handleEditRole = async (e) => {
        try {
            e.preventDefault();
        } catch (error) {
            return console.log(error);
        }
    };

    useEffect(() => {
        console.log(RowId);
    }, [RowId]);

    return(
        <ModalFull isOpen={isOpen}>
            <div className="flex justify-between w-full">
                <div className="font-primaryMedium text-[18px] flex gap-x-3 items-center">
                    <img src={editGif} className="w-[55px]" alt="" />
                    <p>แก้ไขสถานะผู้ใช้งาน</p>
                </div>
                <button onClick={() => setModal(false)} className="mr-4 bg-gray-100 h-[30px] w-[30px] flex justify-center items-center rounded-full hover:bg-gray-400 hover:text-black duration-150 ease-in-out">
                    <IoClose />
                </button>
            </div>
            <div className="flex w-full gap-4 md:block">
                <div className="w-2/6 md:w-full">
                    <div className="flex justify-center items-center py-[40px] bg-gray-100 rounded-md 2xl:py-[20px]">
                        <img src={editSvg} className="w-[150px] object-cover" alt="" />
                    </div>
                </div>
                <div className="w-4/6 md:w-full md:mt-5">
                    <form>
                        <div className="grid grid-cols-2 gap-3">
                            <InputMd lable="NAME TH" color="blue" value={nameTH} OnChange={setNameTH}/>
                            <InputMd lable="NAME ENG" color="blue" value={nameENG} OnChange={setNameENG} />
                        </div>
                        <div className="flex w-full justify-end mt-5">
                            <ButtonMd title="Create New Role" btnColor='bg-red-500' isLoading={isLoading} handleClick={handleEditRole} />
                        </div>
                    </form>
                </div>
            </div>
        </ModalFull>
    );
}

RoleEditModal.propTypes = {
    isOpen: PropTypes.bool,
    RowId: PropTypes.any,
};

export default RoleEditModal;