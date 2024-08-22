import { Modal } from "../../../components/content-modal/modal";
import { InputMd } from "../../../components/content-input/input";
import { useState } from 'react';
import ButtonMd from "../../../components/content-button/button-md";
import ErrorSnackbar from "../../../components/content-alert/notfy/err-alert";
import Snackbar from "../../../components/content-alert/notfy/alert";
import { useDispatch } from 'react-redux';
import { createRole } from "../../../actions/roleAction";



const RoleModal = () => {

    const dispatch = useDispatch();
    const [nameTH, setNameTH] = useState('');
    const [nameENG, setNameENG] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateRole = async (e) => {
        try {
            setIsLoading(true);
            e.preventDefault();

            let data = {
                nameTH,
                nameENG,
            }

            if (!nameTH ||!nameENG) {
                throw "กรุณากรอกข้อมูลให้ครบถ้วน.";
            }
            
            const response = await dispatch(createRole(data));

            if (response.status === true) {
                setNameENG('');
                setNameTH('');
                Snackbar({message: 'สร้าง Role ใหม่สำเร็จ.'});
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            ErrorSnackbar({message: error});
            console.log(error);
        }
    }

    return(
        <Modal title="Create Role" closeModal={isLoading}>
            <div className="flex">
                <div className="w-1/6">

                </div>
                <div className="w-5/6">
                    <form>
                        <div className="grid grid-cols-2 gap-3">
                            <InputMd lable="NAME TH" color="blue" value={nameTH} OnChange={setNameTH}/>
                            <InputMd lable="NAME ENG" color="blue" value={nameENG} OnChange={setNameENG} />
                        </div>
                        <div className="flex w-full justify-end mt-5">
                            <ButtonMd title="Create New Role" btnColor='bg-red-500' isLoading={isLoading} handleClick={handleCreateRole} />
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}

export default RoleModal;